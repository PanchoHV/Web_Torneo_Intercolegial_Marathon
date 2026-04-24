import { BadgeCheck, Megaphone, Shield, Trophy } from 'lucide-react';

const benefits = [
  {
    icon: Trophy,
    title: 'Competencia oficial intercolegial',
    description: 'Tu institución entra a una convocatoria nacional con estructura, seguimiento y organización formal.',
  },
  {
    icon: BadgeCheck,
    title: 'Experiencia deportiva de alto nivel',
    description: 'Un entorno competitivo serio, pensado para representar el orgullo deportivo escolar.',
  },
  {
    icon: Megaphone,
    title: 'Visibilidad institucional',
    description: 'Cada colegio participa con presencia de marca, identidad de equipo y comunicación oficial.',
  },
  {
    icon: Shield,
    title: 'Acompañamiento organizador',
    description: 'El equipo del torneo contacta a la persona encargada para continuar el proceso de preinscripción.',
  },
];

export default function RegistrationBenefits() {
  return (
    <section>
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full bg-marathon-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-marathon-blue">
          Beneficios de participar
        </span>
        <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.55rem)] font-black uppercase leading-tight tracking-[0.02em] text-marathon-blue">
          Una convocatoria con peso de gran evento nacional
        </h2>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="group relative overflow-hidden rounded-2xl border border-marathon-blue/10 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-marathon-red/30 hover:shadow-card-hover"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-marathon-red opacity-0 transition group-hover:opacity-100" />
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-marathon-blue text-white">
              <benefit.icon size={20} />
            </div>
            <h3 className="text-lg font-black leading-tight text-marathon-blue">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-marathon-gray">{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
