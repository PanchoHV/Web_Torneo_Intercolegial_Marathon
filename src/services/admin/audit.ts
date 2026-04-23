import { supabase } from '@/lib/supabase/client';
import type { ExportAuditRecord } from '@/types/admin';

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase no está configurado para el módulo admin.');
  }

  return supabase;
}

export async function fetchExportAudit(limit = 100): Promise<ExportAuditRecord[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('registration_exports_audit')
    .select(
      'id, requested_by_user_id, requested_by_email, role, exported_at, format, filters_json, rows_count, file_name, purpose'
    )
    .order('exported_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ExportAuditRecord[];
}
