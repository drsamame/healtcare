import { z } from 'zod';

const userFormValidation = z.object({
	username: z
		.string()
		.min(2, 'debe tener al menos 2 caracteres.')
		.max(50, 'debe tener menos de 50 caracteres.'),
	email: z.string().email('debe ser un correo válido.'),
});
