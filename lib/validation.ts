import { z } from 'zod';

export const userFormValidation = z.object({
	name: z
		.string()
		.min(2, 'Debe tener al menos 2 caracteres.')
		.max(50, 'Debe tener menos de 50 caracteres.'),
	email: z.string().email('Debe ser un correo válido.'),
	phone: z
		.string()
		.refine(
			(phone) => /^\+[1-9]\d{1,14}$/.test(phone),
			'Número de teléfono inválido.'
		),
});
