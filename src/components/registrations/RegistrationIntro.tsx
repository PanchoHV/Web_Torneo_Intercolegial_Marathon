export default function RegistrationIntro() {
  return (
    <section id="requisitos" className="grid gap-6 rounded-[1.5rem] border border-marathon-blue/10 bg-white p-6 shadow-card lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
      <div>
        <span className="inline-flex rounded-full bg-marathon-red/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-marathon-red">
          Convocatoria institucional
        </span>
        <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.65rem)] font-black uppercase leading-tight tracking-[0.02em] text-marathon-blue">
          Bienvenida oficial a colegios participantes
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-marathon-gray">
          Marathon invita a colegios de Ecuador a formar parte del Torneo Intercolegial Ecuador 2026. Completa este formulario oficial de inscripción y un ejecutivo del torneo se pondrá en contacto contigo.
        </p>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-marathon-blue/10 bg-marathon-ice p-5">
        <div className="absolute left-0 top-0 h-full w-1.5 bg-marathon-red" />
        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-marathon-blue">Requisitos del registro</h3>
        <ul className="mt-4 space-y-3 text-sm font-medium text-marathon-gray">
          <li>Datos completos de la institución educativa.</li>
          <li>Persona encargada autorizada para recibir contacto oficial.</li>
          <li>Cédula, correo y celular válidos para seguimiento.</li>
          <li>Ciudad participante dentro de nuestras regiones habilitadas.</li>
        </ul>
      </div>
    </section>
  );
}
