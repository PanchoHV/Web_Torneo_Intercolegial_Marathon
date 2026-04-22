import { supabase } from '@/lib/supabase/client';
import type {
  RegistrationFormValues,
  RegistrationInsert,
  RegistrationResult,
} from '@/types/registration';

const mapRegistrationInsert = (values: RegistrationFormValues): RegistrationInsert => ({
  school_name: values.institutionName,
  school_address: values.institutionAddress,
  contact_name: values.delegateName,
  applicant_role: values.delegateRole,
  applicant_role_other: values.delegateRole === 'Otros' ? values.delegateRole : null,
  school_type: values.schoolType,
  contact_id_number: values.delegateId,
  contact_email: values.email,
  contact_phone: values.phone,
  city: values.city,
  status: 'new',
  source: 'landing_inscripciones',
});

export async function createRegistration(
  values: RegistrationFormValues
): Promise<RegistrationResult> {
  if (!supabase) {
    throw new Error(
      'Supabase no esta configurado. Define VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY en .env.local y reinicia Vite.'
    );
  }

  const payload = mapRegistrationInsert(values);

  const { data, error } = await supabase.functions.invoke('create-registration', {
    body: payload,
  });

  if (error) {
    throw new Error(error.message || 'No se pudo registrar la inscripción.');
  }

  const response = data as { id?: string; created_at?: string } | null;

  return {
    id: response?.id ?? null,
    createdAt: response?.created_at ?? null,
    isLocal: false,
  };
}