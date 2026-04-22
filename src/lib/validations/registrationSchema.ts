import { z } from 'zod';

const delegateRoleValues = ['Rector', 'Entrenador', 'Docente', 'Otros'] as const;
const schoolTypeValues = ['Privado', 'Público'] as const;
const cityValues = ['Quito', 'Cuenca', 'Santo Domingo'] as const;

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
  termsAccepted: z.boolean().refine((value) => value, {
    message: 'Debes aceptar el uso de datos para continuar.',
  }),
});

export type RegistrationSchemaValues = z.infer<typeof registrationSchema>;
