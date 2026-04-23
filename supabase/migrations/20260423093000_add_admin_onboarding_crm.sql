alter table public.school_registrations
  add column if not exists school_name text,
  add column if not exists school_address text,
  add column if not exists contact_name text,
  add column if not exists applicant_role text,
  add column if not exists applicant_role_other text,
  add column if not exists school_type text,
  add column if not exists contact_id_number text,
  add column if not exists contact_email text,
  add column if not exists contact_phone text,
  add column if not exists city text,
  add column if not exists status text,
  add column if not exists source text,
  add column if not exists onboarding_status text not null default 'new',
  add column if not exists assigned_to uuid,
  add column if not exists last_contact_at timestamptz,
  add column if not exists internal_priority text,
  add column if not exists updated_at timestamptz not null default timezone('utc', now());

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'school_registrations_onboarding_status_check'
  ) then
    alter table public.school_registrations
      add constraint school_registrations_onboarding_status_check
      check (
        onboarding_status in (
          'new',
          'in_review',
          'qualified',
          'contacted',
          'pending_docs',
          'approved',
          'rejected'
        )
      );
  end if;
end $$;

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'admin_users_role_check'
  ) then
    alter table public.admin_users
      add constraint admin_users_role_check
      check (role in ('admin', 'onboarding', 'viewer'));
  end if;
end $$;

create table if not exists public.onboarding_notes (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references public.school_registrations(id) on delete cascade,
  author_user_id uuid not null references public.admin_users(id) on delete restrict,
  author_email text not null,
  note text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.registration_exports_audit (
  id uuid primary key default gen_random_uuid(),
  requested_by_user_id uuid not null references public.admin_users(id) on delete restrict,
  requested_by_email text not null,
  role text not null,
  exported_at timestamptz not null default timezone('utc', now()),
  format text not null,
  filters_json jsonb not null default '{}'::jsonb,
  rows_count integer not null default 0,
  file_name text not null,
  purpose text
);

create index if not exists idx_school_registrations_created_at
  on public.school_registrations (created_at desc);

create index if not exists idx_school_registrations_onboarding_status
  on public.school_registrations (onboarding_status);

create index if not exists idx_school_registrations_city
  on public.school_registrations (city);

create index if not exists idx_school_registrations_school_type
  on public.school_registrations (school_type);

create index if not exists idx_school_registrations_assigned_to
  on public.school_registrations (assigned_to);

create index if not exists idx_onboarding_notes_registration_id_created_at
  on public.onboarding_notes (registration_id, created_at desc);

create index if not exists idx_registration_exports_audit_exported_at
  on public.registration_exports_audit (exported_at desc);

create index if not exists idx_registration_exports_audit_requested_by
  on public.registration_exports_audit (requested_by_user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.current_admin_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select au.role
  from public.admin_users au
  where au.id = auth.uid()
    and au.is_active = true
  limit 1;
$$;

create or replace function public.is_internal_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.id = auth.uid()
      and au.is_active = true
  );
$$;

create or replace function public.can_manage_onboarding()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_admin_role() in ('admin', 'onboarding'), false);
$$;

grant execute on function public.current_admin_role() to authenticated, anon;
grant execute on function public.is_internal_user() to authenticated, anon;
grant execute on function public.can_manage_onboarding() to authenticated, anon;

drop trigger if exists set_school_registrations_updated_at on public.school_registrations;

create trigger set_school_registrations_updated_at
before update on public.school_registrations
for each row
execute function public.set_updated_at();

drop trigger if exists set_admin_users_updated_at on public.admin_users;

create trigger set_admin_users_updated_at
before update on public.admin_users
for each row
execute function public.set_updated_at();

alter table public.school_registrations enable row level security;
alter table public.admin_users enable row level security;
alter table public.onboarding_notes enable row level security;
alter table public.registration_exports_audit enable row level security;

drop policy if exists "internal users can read registrations" on public.school_registrations;
create policy "internal users can read registrations"
  on public.school_registrations
  for select
  to authenticated
  using (public.is_internal_user());

drop policy if exists "internal users can read admin users" on public.admin_users;
create policy "internal users can read admin users"
  on public.admin_users
  for select
  to authenticated
  using (public.is_internal_user());

drop policy if exists "internal users can read onboarding notes" on public.onboarding_notes;
create policy "internal users can read onboarding notes"
  on public.onboarding_notes
  for select
  to authenticated
  using (public.is_internal_user());

drop policy if exists "admins can read export audit" on public.registration_exports_audit;
create policy "admins can read export audit"
  on public.registration_exports_audit
  for select
  to authenticated
  using (public.current_admin_role() = 'admin');
