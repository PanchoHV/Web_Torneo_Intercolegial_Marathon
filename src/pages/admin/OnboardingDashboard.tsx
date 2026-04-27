import { Download, Eye, RefreshCw, Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';

import StatusBadge from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminAuth } from '@/lib/auth/adminAuth';
import { formatDateTime } from '@/lib/auth/adminFormatters';
import { CITY_OPTIONS_FLAT, SCHOOL_TYPE_OPTIONS } from '@/lib/constants/registrationOptions';
import { exportRegistrations } from '@/services/admin/export';
import { fetchRegistrations } from '@/services/admin/registrations';
import { EMPTY_ADMIN_FILTERS, ONBOARDING_STATUS_OPTIONS, type AdminRegistration } from '@/types/admin';

const PAGE_SIZE = 15;

export default function OnboardingDashboard() {
  const { canExport } = useAdminAuth();
  const [filters, setFilters] = useState(EMPTY_ADMIN_FILTERS);
  const [searchDraft, setSearchDraft] = useState('');
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  const loadRegistrations = useCallback(
    async (showRefreshing = false) => {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        setError(null);
        const result = await fetchRegistrations(filters, page, PAGE_SIZE);
        setRegistrations(result.data);
        setCount(result.count);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'No se pudo cargar la base.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [filters, page]
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setFilters((current) => {
        if (current.search === searchDraft) {
          return current;
        }

        setPage(1);
        return {
          ...current,
          search: searchDraft,
        };
      });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchDraft]);

  useEffect(() => {
    void loadRegistrations();
  }, [loadRegistrations]);

  useEffect(() => {
    const handleFocus = () => {
      void loadRegistrations(true);
    };

    const interval = window.setInterval(() => {
      void loadRegistrations(true);
    }, 30000);

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.clearInterval(interval);
    };
  }, [loadRegistrations]);

  const showingFrom = count === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const showingTo = Math.min(count, page * PAGE_SIZE);

  const summary = useMemo(
    () => [
      { label: 'Registros', value: count },
      {
        label: 'Aprobados',
        value: registrations.filter((item) => item.onboarding_status === 'approved').length,
      },
      {
        label: 'Pendientes',
        value: registrations.filter((item) => item.onboarding_status === 'pending_docs').length,
      },
    ],
    [count, registrations]
  );

  return (
    <div className="grid min-w-0 gap-6">
      <section className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-marathon-blue/65">
            Base interna
          </p>
          <h2 className="mt-2 break-words text-2xl font-black uppercase tracking-[0.02em] text-marathon-blue sm:text-3xl">
            Seguimiento de instituciones
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-marathon-gray">
            Busca, filtra y revisa la base de inscripciones sin afectar el flujo público del torneo.
          </p>
        </div>

        <div className="grid gap-2 sm:flex sm:flex-wrap sm:gap-3">
          <Button
            variant="outline"
            className="min-h-11 rounded-full border-marathon-blue/15 text-marathon-blue"
            onClick={() => void loadRegistrations(true)}
            disabled={refreshing}
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            Actualizar
          </Button>
          {canExport && (
            <Button
              className="min-h-11 rounded-full bg-marathon-red text-white shadow-button hover:bg-marathon-red/90"
              onClick={async () => {
                const purpose = window.prompt('Motivo de la exportación (opcional):', '') ?? '';
                setExporting(true);
                try {
                  await exportRegistrations(filters, purpose);
                } catch (exportError) {
                  setError(
                    exportError instanceof Error
                      ? exportError.message
                      : 'No se pudo exportar la base.'
                  );
                } finally {
                  setExporting(false);
                }
              }}
              disabled={exporting}
            >
              <Download size={16} />
              {exporting ? 'Exportando...' : 'Exportar CSV'}
            </Button>
          )}
        </div>
      </section>

      <section className="grid min-w-0 gap-4 md:grid-cols-3">
        {summary.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-marathon-blue/10 bg-white px-5 py-4 shadow-card"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-marathon-blue/55">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-black text-marathon-blue">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid min-w-0 gap-4 rounded-[1.5rem] border border-marathon-blue/10 bg-white p-3 shadow-card sm:p-5">
        <div className="grid min-w-0 gap-4 xl:grid-cols-[1.3fr_repeat(5,minmax(0,1fr))]">
          <label className="grid gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-marathon-blue/60">
              Buscar
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-marathon-blue/35" size={16} />
              <Input
                value={searchDraft}
                onChange={(event) => setSearchDraft(event.target.value)}
                placeholder="Colegio, responsable o correo"
                className="h-11 rounded-2xl border-marathon-blue/10 pl-10"
              />
            </div>
          </label>

          <FilterSelect
            label="Ciudad"
            value={filters.city}
            placeholder="Todas"
            options={CITY_OPTIONS_FLAT}
            onChange={(value) => {
              setPage(1);
              setFilters((current) => ({ ...current, city: value }));
            }}
          />

          <FilterSelect
            label="Tipo"
            value={filters.schoolType}
            placeholder="Todos"
            options={SCHOOL_TYPE_OPTIONS}
            onChange={(value) => {
              setPage(1);
              setFilters((current) => ({ ...current, schoolType: value }));
            }}
          />

          <FilterSelect
            label="Onboarding"
            value={filters.onboardingStatus}
            placeholder="Todos"
            options={ONBOARDING_STATUS_OPTIONS.map((item) => item.value)}
            optionLabelMap={Object.fromEntries(
              ONBOARDING_STATUS_OPTIONS.map((item) => [item.value, item.label])
            )}
            onChange={(value) => {
              setPage(1);
              setFilters((current) => ({
                ...current,
                onboardingStatus: value as typeof current.onboardingStatus,
              }));
            }}
          />

          <DateFilter
            label="Desde"
            value={filters.dateFrom}
            onChange={(value) => {
              setPage(1);
              setFilters((current) => ({ ...current, dateFrom: value }));
            }}
          />

          <DateFilter
            label="Hasta"
            value={filters.dateTo}
            onChange={(value) => {
              setPage(1);
              setFilters((current) => ({ ...current, dateTo: value }));
            }}
          />
        </div>

        {error && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}
      </section>

      <section className="min-w-0 rounded-[1.5rem] border border-marathon-blue/10 bg-white p-3 shadow-card sm:p-5">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-marathon-gray">
            Mostrando {showingFrom}-{showingTo} de {count} registros
          </p>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:flex">
            <Button
              variant="outline"
              className="min-h-11 rounded-full"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <span className="text-center text-sm font-semibold text-marathon-blue">
              Página {page} de {totalPages}
            </span>
            <Button
              variant="outline"
              className="min-h-11 rounded-full"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page >= totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>

        <div className="grid gap-3 2xl:hidden">
          {loading ? (
            <div className="rounded-2xl border border-marathon-blue/10 bg-marathon-ice/45 px-4 py-8 text-center text-sm font-semibold text-marathon-gray">
              Cargando base de inscripciones...
            </div>
          ) : registrations.length === 0 ? (
            <div className="rounded-2xl border border-marathon-blue/10 bg-marathon-ice/45 px-4 py-8 text-center text-sm font-semibold text-marathon-gray">
              No se encontraron registros con esos filtros.
            </div>
          ) : (
            registrations.map((registration) => (
              <article
                key={registration.id}
                className="grid gap-4 rounded-2xl border border-marathon-blue/10 bg-marathon-ice/35 p-4"
              >
                <div className="min-w-0">
                  <p className="break-words font-bold text-marathon-blue">
                    {registration.school_name}
                  </p>
                  <p className="mt-1 text-sm text-marathon-gray">
                    {registration.city} · {registration.school_type}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {registration.tournament_categories?.length ? (
                    registration.tournament_categories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-marathon-blue"
                      >
                        {category}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm font-semibold text-marathon-gray">
                      Sin categorías
                    </span>
                  )}
                </div>

                <div className="grid gap-2 text-sm text-marathon-gray">
                  <p>
                    <strong className="text-marathon-blue">Responsable:</strong>{' '}
                    {registration.contact_name}
                  </p>
                  <p className="break-words">
                    <strong className="text-marathon-blue">Correo:</strong>{' '}
                    {registration.contact_email}
                  </p>
                  <p>
                    <strong className="text-marathon-blue">Teléfono:</strong>{' '}
                    {registration.contact_phone}
                  </p>
                  <p>
                    <strong className="text-marathon-blue">Registro:</strong>{' '}
                    {formatDateTime(registration.created_at)}
                  </p>
                </div>

                <div className="grid gap-3 border-t border-marathon-blue/10 pt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={registration.onboarding_status} />
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-marathon-blue/70">
                      Participante: {registration.email_to_applicant_sent ? 'Sí' : 'No'}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-marathon-blue/70">
                      Ejecutivo: {registration.email_to_executive_sent ? 'Sí' : 'No'}
                    </span>
                  </div>
                  <Button asChild variant="outline" className="min-h-11 rounded-full">
                    <Link to={`/admin/onboarding/${registration.id}`}>
                      <Eye size={16} />
                      Ver detalle
                    </Link>
                  </Button>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="hidden min-w-0 2xl:block">
          <Table className="min-w-[1420px]">
            <TableHeader>
              <TableRow>
                <TableHead>Institución</TableHead>
                <TableHead>Ciudad</TableHead>
                <TableHead>Categorías</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Onboarding</TableHead>
                <TableHead>Correos</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={12} className="py-10 text-center text-marathon-gray">
                    Cargando base de inscripciones...
                  </TableCell>
                </TableRow>
              ) : registrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} className="py-10 text-center text-marathon-gray">
                    No se encontraron registros con esos filtros.
                  </TableCell>
                </TableRow>
              ) : (
                registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="max-w-[220px] whitespace-normal">
                      <div>
                        <p className="font-bold text-marathon-blue">{registration.school_name}</p>
                        <p className="mt-1 text-xs text-marathon-gray">
                          {registration.school_type}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{registration.city}</TableCell>
                    <TableCell className="max-w-[220px] whitespace-normal text-xs">
                      {registration.tournament_categories?.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {registration.tournament_categories.map((category) => (
                            <span
                              key={category}
                              className="rounded-full bg-marathon-blue/8 px-2 py-1 font-bold text-marathon-blue"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-marathon-gray">Sin categorías</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[180px] whitespace-normal">
                      {registration.contact_name}
                    </TableCell>
                    <TableCell>{registration.applicant_role}</TableCell>
                    <TableCell className="max-w-[220px] whitespace-normal text-xs">
                      {registration.contact_email}
                    </TableCell>
                    <TableCell>{registration.contact_phone}</TableCell>
                    <TableCell>{formatDateTime(registration.created_at)}</TableCell>
                    <TableCell>{registration.status}</TableCell>
                    <TableCell>
                      <StatusBadge status={registration.onboarding_status} />
                    </TableCell>
                    <TableCell className="max-w-[160px] whitespace-normal text-xs">
                      <div className="flex flex-col gap-1">
                        <span>
                          Participante: {registration.email_to_applicant_sent ? 'Sí' : 'No'}
                        </span>
                        <span>
                          Ejecutivo: {registration.email_to_executive_sent ? 'Sí' : 'No'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" className="min-h-11 rounded-full">
                        <Link to={`/admin/onboarding/${registration.id}`}>
                          <Eye size={16} />
                          Ver detalle
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  placeholder,
  options,
  onChange,
  optionLabelMap,
}: {
  label: string;
  value: string;
  placeholder: string;
  options: readonly string[];
  onChange: (value: string) => void;
  optionLabelMap?: Record<string, string>;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-marathon-blue/60">
        {label}
      </span>
      <Select
        value={value || '__all__'}
        onValueChange={(next) => onChange(next === '__all__' ? '' : next)}
      >
        <SelectTrigger className="h-11 w-full rounded-2xl border-marathon-blue/10 bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" className="rounded-2xl border-marathon-blue/10">
          <SelectItem value="__all__">{placeholder}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {optionLabelMap?.[option] ?? option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

function DateFilter({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-marathon-blue/60">
        {label}
      </span>
      <Input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-2xl border-marathon-blue/10"
      />
    </label>
  );
}
