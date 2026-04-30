import { z } from 'zod';

const delegateRoleValues = ['Rector', 'Entrenador', 'Docente', 'Otros'] as const;
const schoolTypeValues = ['Privado', 'Fiscal', 'Fiscomisional'] as const;
const cityValues = [
  'Guayaquil (Guayas)',
  'Manta',
  'Portoviejo',
  'Esmeraldas',
  'Machala',
  'Quito (Pichincha)',
  'Ibarra',
  'Ambato',
  'Cuenca',
  'Tena',
] as const;
const categoryValues = [
  'Sub 13 Masculino',
  'Sub 15 Masculino',
  'Sub 17 Masculino',
  'Sub 15 Femenino',
  'Sub 17 Femenino',
] as const;

export const registrationSchema = z.object({
  institutionName: z.string().trim().min(3, 'Ingresa el nombre completo del colegio.'),
  institutionAddress: z.string().trim().min(8, 'Ingresa la dirección del colegio.'),
  delegateName: z.string().trim().min(3, 'Ingresa el nombre de la persona encargada.'),
  delegateRole: z.enum(delegateRoleValues, {
    message: 'Selecciona el cargo del solicitante.',
  }),
  schoolType: z.enum(schoolTypeValues, {
    message: 'Selecciona el tipo de colegio.',
  }),
  delegateId: z
    .string()
    .trim()
    .regex(/^\d+$/, 'La cédula debe contener solo números.')
    .length(10, 'La cédula ecuatoriana debe tener 10 dígitos.'),
  email: z.string().trim().email('Ingresa un correo válido.'),
  phone: z
    .string()
    .trim()
    .regex(/^\d+$/, 'El celular debe contener solo números.')
    .length(10, 'El celular ecuatoriano debe tener 10 dígitos.'),
  city: z.enum(cityValues, {
    message: 'Selecciona una ciudad.',
  }),
  categories: z
    .array(z.enum(categoryValues))
    .min(1, 'Selecciona al menos una categoría del torneo.'),
  termsAccepted: z.boolean().refine((value) => value, {
    message: 'Debes aceptar el uso de datos para continuar.',
  }),
  website: z.string().default(''),
  turnstileToken: z.string().default(''),
});

export type RegistrationSchemaValues = z.input<typeof registrationSchema>;
