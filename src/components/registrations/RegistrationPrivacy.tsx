import { LockKeyhole } from 'lucide-react';

export default function RegistrationPrivacy() {
  return (
    <section className="rounded-2xl border border-marathon-blue/10 bg-white/85 p-5 shadow-card backdrop-blur-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-marathon-blue text-white">
          <LockKeyhole size={20} />
        </div>
        <p className="text-sm leading-relaxed text-marathon-gray">
          La información enviada será utilizada exclusivamente para fines de preinscripción y contacto oficial del Torneo Intercolegial Marathon Ecuador 2026.
        </p>
      </div>
    </section>
  );
}
