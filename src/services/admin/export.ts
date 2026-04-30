import { supabase } from '@/lib/supabase/client';
import type { AdminRegistrationFilters } from '@/types/admin';

export type ExportFormat = 'csv' | 'xlsx';

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

function getDownloadFileName(contentDisposition: string | null) {
  if (!contentDisposition) {
    return '';
  }

  const match = contentDisposition.match(/filename="?([^"]+)"?/i);
  return match?.[1] ?? '';
}

export async function exportRegistrations(
  filters: AdminRegistrationFilters,
  purpose: string,
  format: ExportFormat = 'csv'
) {
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

  const response = await fetch(getFunctionUrl('admin-export-registrations'), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filters,
      format,
      purpose,
    }),
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(errorBody?.error ?? 'No se pudo exportar la base.');
  }

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download =
    getDownloadFileName(response.headers.get('Content-Disposition')) || `registrations_export.${format}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}
