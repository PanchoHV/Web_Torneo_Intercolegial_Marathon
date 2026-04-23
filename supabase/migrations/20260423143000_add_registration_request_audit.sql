create table if not exists public.registration_request_audit (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ip_address text,
  user_agent text,
  status text not null,
  reason text
);

create index if not exists registration_request_audit_created_at_idx
  on public.registration_request_audit (created_at desc);

create index if not exists registration_request_audit_ip_created_at_idx
  on public.registration_request_audit (ip_address, created_at desc);

alter table public.registration_request_audit enable row level security;

drop policy if exists "admin users can read registration request audit"
  on public.registration_request_audit;

create policy "admin users can read registration request audit"
  on public.registration_request_audit
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.admin_users admin_user
      where admin_user.id = auth.uid()
        and admin_user.is_active = true
        and admin_user.role = 'admin'
    )
  );
