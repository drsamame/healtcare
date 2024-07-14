import { z } from 'zod';

export const userFormValidation = z.object({
	username: z
		.string()
		.min(2, 'debe tener al menos 2 caracteres.')
		.max(50, 'debe tener menos de 50 caracteres.'),
	email: z.string().email('debe ser un correo válido.'),
	phone: z
		.string()
		.refine(
			(phone) => /^\+[1-9]\d{1,14}$/.test(phone),
			'Número de teléfono inválido.'
		),
});
