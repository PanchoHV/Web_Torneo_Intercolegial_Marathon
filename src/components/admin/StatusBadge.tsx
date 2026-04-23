import { Badge } from '@/components/ui/badge';
import type { OnboardingStatus } from '@/types/admin';

const statusStyles: Record<OnboardingStatus, string> = {
  new: 'bg-slate-100 text-slate-700 border-slate-200',
  in_review: 'bg-amber-100 text-amber-800 border-amber-200',
  qualified: 'bg-blue-100 text-blue-800 border-blue-200',
  contacted: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  pending_docs: 'bg-violet-100 text-violet-800 border-violet-200',
  approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  rejected: 'bg-rose-100 text-rose-800 border-rose-200',
};

const statusLabels: Record<OnboardingStatus, string> = {
  new: 'Nuevo',
  in_review: 'En revisión',
  qualified: 'Calificado',
  contacted: 'Contactado',
  pending_docs: 'Pendiente docs',
  approved: 'Aprobado',
  rejected: 'Rechazado',
};

export default function StatusBadge({ status }: { status: OnboardingStatus }) {
  return (
    <Badge
      variant="outline"
      className={`border px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-[0.08em] ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </Badge>
  );
}
