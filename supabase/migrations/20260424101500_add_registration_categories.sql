alter table public.school_registrations
  add column if not exists tournament_categories text[] not null default '{}'::text[];

comment on column public.school_registrations.tournament_categories is
  'Categorias seleccionadas por el colegio en el formulario publico de preinscripcion.';
