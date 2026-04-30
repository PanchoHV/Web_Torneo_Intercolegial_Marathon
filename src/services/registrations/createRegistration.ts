import { supabase } from '@/lib/supabase/client';
import type {
  RegistrationCreateRequest,
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
  tournament_categories: values.categories,
  status: 'pending_regional_review',
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

  const payload: RegistrationCreateRequest = {
    ...mapRegistrationInsert(values),
    website: values.website?.trim() || '',
    turnstile_token: values.turnstileToken?.trim() || '',
  };

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-registration`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = (await response.json().catch(() => null)) as
    | { id?: string; created_at?: string; error?: string; message?: string }
    | null;

  if (!response.ok) {
    const backendMessage =
      data?.error || data?.message || 'No se pudo registrar la inscripción.';

    const localTurnstileHint =
      typeof window !== 'undefined' &&
      ['localhost', '127.0.0.1'].includes(window.location.hostname) &&
      response.status === 400 &&
      backendMessage.toLowerCase().includes('verificación de seguridad')
        ? ' Si estás probando en local, revisa que Turnstile permita localhost o usa un dominio autorizado.'
        : '';

    throw new Error(`${backendMessage}${localTurnstileHint}`);
  }

  if (!data) {
    throw new Error('No se recibió una respuesta válida del servidor.');
  }

  return {
    id: data.id ?? null,
    createdAt: data.created_at ?? null,
    isLocal: false,
  };
}
