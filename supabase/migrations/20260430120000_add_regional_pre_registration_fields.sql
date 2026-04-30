alter table public.school_registrations
add column if not exists region text,
add column if not exists inscription_start_label text,
add column if not exists match_start_label text,
add column if not exists calendar_message text,
add column if not exists pre_registration_status text default 'pending_regional_review';

create index if not exists idx_school_registrations_region
on public.school_registrations(region);

create index if not exists idx_school_registrations_pre_registration_status
on public.school_registrations(pre_registration_status);

create index if not exists idx_school_registrations_city
on public.school_registrations(city);
