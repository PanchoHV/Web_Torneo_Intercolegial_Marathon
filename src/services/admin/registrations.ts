import { supabase } from '@/lib/supabase/client';
import { callAdminFunction } from '@/services/admin/functionClient';
import type {
  AdminRegistration,
  AdminRegistrationFilters,
  AdminUserProfile,
  OnboardingNote,
  OnboardingStatus,
  RegistrationListResult,
} from '@/types/admin';

type RegistrationUpdatePayload = {
  registrationId: string;
  onboardingStatus?: OnboardingStatus;
  assignedTo?: string | null;
  internalPriority?: string | null;
  lastContactAt?: string | null;
};

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase no está configurado para el módulo admin.');
  }

  return supabase;
}

function applyRegistrationFilters(
  query: any,
  filters: AdminRegistrationFilters
) {
  const search = filters.search.trim();
  if (search) {
    const safeSearch = search.replace(/[%(),]/g, ' ').trim();
    query = query.or(
      `school_name.ilike.%${safeSearch}%,contact_name.ilike.%${safeSearch}%,contact_email.ilike.%${safeSearch}%`
    );
  }

  if (filters.city) {
    query = query.eq('city', filters.city);
  }

  if (filters.schoolType) {
    query = query.eq('school_type', filters.schoolType);
  }

  if (filters.onboardingStatus) {
    query = query.eq('onboarding_status', filters.onboardingStatus);
  }

  if (filters.dateFrom) {
    query = query.gte('created_at', `${filters.dateFrom}T00:00:00.000Z`);
  }

  if (filters.dateTo) {
    const nextDate = new Date(`${filters.dateTo}T00:00:00.000Z`);
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);
    query = query.lt('created_at', nextDate.toISOString());
  }

  return query;
}

export async function fetchRegistrations(
  filters: AdminRegistrationFilters,
  page: number,
  pageSize: number
): Promise<RegistrationListResult> {
  const client = requireSupabase();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = client
    .from('school_registrations')
    .select(
      'id, created_at, updated_at, school_name, school_address, contact_name, applicant_role, applicant_role_other, school_type, contact_id_number, contact_email, contact_phone, city, status, source, onboarding_status, assigned_to, last_contact_at, internal_priority, email_to_applicant_sent, email_to_executive_sent',
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(from, to);

  query = applyRegistrationFilters(query, filters);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: (data ?? []) as AdminRegistration[],
    count: count ?? 0,
  };
}

export async function fetchRegistrationById(id: string): Promise<AdminRegistration> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('school_registrations')
    .select(
      'id, created_at, updated_at, school_name, school_address, contact_name, applicant_role, applicant_role_other, school_type, contact_id_number, contact_email, contact_phone, city, status, source, onboarding_status, assigned_to, last_contact_at, internal_priority, email_to_applicant_sent, email_to_executive_sent'
    )
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AdminRegistration;
}

export async function fetchRegistrationNotes(registrationId: string): Promise<OnboardingNote[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('onboarding_notes')
    .select('id, registration_id, author_user_id, author_email, note, created_at')
    .eq('registration_id', registrationId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as OnboardingNote[];
}

export async function fetchActiveAdminUsers(): Promise<AdminUserProfile[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('admin_users')
    .select('id, email, full_name, role, is_active, created_at, updated_at')
    .eq('is_active', true)
    .order('role')
    .order('email');

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminUserProfile[];
}

export async function updateRegistration(payload: RegistrationUpdatePayload) {
  await callAdminFunction('admin-update-registration', payload);
}

export async function addRegistrationNote(registrationId: string, note: string) {
  await callAdminFunction('admin-add-note', { registrationId, note });
}

export async function resendRegistrationEmails(registrationId: string) {
  await callAdminFunction('admin-resend-registration-email', { registrationId });
}

export async function markRegistrationAsContacted(registrationId: string) {
  await callAdminFunction('admin-mark-contact', { registrationId });
}
