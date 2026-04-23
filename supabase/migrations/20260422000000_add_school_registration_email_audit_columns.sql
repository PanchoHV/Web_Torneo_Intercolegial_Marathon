alter table public.school_registrations
  add column if not exists email_to_applicant_sent boolean not null default false,
  add column if not exists email_to_executive_sent boolean not null default false,
  add column if not exists participant_email_id text,
  add column if not exists executive_email_id text,
  add column if not exists email_audit_warnings text[],
  add column if not exists applicant_email_error text,
  add column if not exists executive_email_error text;
