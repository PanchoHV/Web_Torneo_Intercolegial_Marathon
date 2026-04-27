import { RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/auth/adminFormatters';
import { fetchExportAudit } from '@/services/admin/audit';
import type { ExportAuditRecord } from '@/types/admin';

export default function AuditPage() {
  const [records, setRecords] = useState<ExportAuditRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAudit = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      setError(null);
      const data = await fetchExportAudit();
      setRecords(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar la auditoría.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadAudit();
  }, [loadAudit]);

  return (
    <div className="grid min-w-0 gap-6">
      <section className="flex min-w-0 flex-col gap-4 rounded-[1.5rem] border border-marathon-blue/10 bg-white p-5 shadow-card lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marathon-blue/60">
            Auditoría interna
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-[0.02em] text-marathon-blue">
            Exportaciones registradas
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-marathon-gray">
            Registro de descargas de base con usuario, filtros, formato y cantidad de filas.
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-full border-marathon-blue/15 text-marathon-blue"
          onClick={() => void loadAudit(true)}
          disabled={refreshing}
        >
          <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
          Actualizar
        </Button>
      </section>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      <section className="min-w-0 rounded-[1.5rem] border border-marathon-blue/10 bg-white p-5 shadow-card">
        <Table className="min-w-[1120px]">
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Formato</TableHead>
              <TableHead>Filas</TableHead>
              <TableHead>Archivo</TableHead>
              <TableHead>Propósito</TableHead>
              <TableHead>Filtros</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-marathon-gray">
                  Cargando auditoría...
                </TableCell>
              </TableRow>
            ) : records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-marathon-gray">
                  Aún no hay exportaciones registradas.
                </TableCell>
              </TableRow>
            ) : (
              records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="max-w-[220px] whitespace-normal">
                    {record.requested_by_email}
                  </TableCell>
                  <TableCell>{record.role}</TableCell>
                  <TableCell>{formatDateTime(record.exported_at)}</TableCell>
                  <TableCell>{record.format.toUpperCase()}</TableCell>
                  <TableCell>{record.rows_count}</TableCell>
                  <TableCell className="max-w-[220px] whitespace-normal text-xs">
                    {record.file_name}
                  </TableCell>
                  <TableCell className="max-w-[220px] whitespace-normal">
                    {record.purpose || '—'}
                  </TableCell>
                  <TableCell className="max-w-[280px] whitespace-normal">
                    <pre className="whitespace-pre-wrap break-words text-xs text-marathon-gray">
                      {JSON.stringify(record.filters_json, null, 2)}
                    </pre>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
