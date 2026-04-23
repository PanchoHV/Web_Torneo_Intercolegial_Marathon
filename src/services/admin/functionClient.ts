import { supabase } from '@/lib/supabase/client';

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase no está configurado para el módulo admin.');
  }

  return supabase;
}

function getFunctionUrl(functionName: string) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  if (!supabaseUrl) {
    throw new Error('VITE_SUPABASE_URL no está configurado.');
  }

  return `${supabaseUrl}/functions/v1/${functionName}`;
}

export async function callAdminFunction<TResponse>(
  functionName: string,
  body: Record<string, unknown>
): Promise<TResponse> {
  const client = requireSupabase();
  const {
    data: { session },
    error: sessionError,
  } = await client.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  if (!session?.access_token) {
    throw new Error('Tu sesión expiró. Vuelve a iniciar sesión.');
  }

  const response = await fetch(getFunctionUrl(functionName), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const responseBody = (await response.json().catch(() => null)) as
    | { error?: string; message?: string }
    | null;

  if (!response.ok) {
    throw new Error(
      responseBody?.error ||
        responseBody?.message ||
        'La función interna devolvió un error.'
    );
  }

  return responseBody as TResponse;
}
