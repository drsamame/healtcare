import { z } from 'zod';
const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/webp',
];
export const userFormValidation = z
	.object({
		name: z
			.string()
			.min(2, 'Debe tener al menos 2 caracteres.')
			.max(50, 'Debe tener menos de 50 caracteres.'),
		email: z.string().email('Debe ser un correo válido.'),
		password: z
			.string()
			.min(8, { message: 'Debe tener minimo 8 caracteres.' })
			.max(15, { message: 'Debe tener máximo 15 caracteres.' })
			.refine((password) => /[A-Z]/.test(password), {
				message: 'Debe tener al menos una Mayúscula.',
			})
			.refine((password) => /[0-9]/.test(password), {
				message: 'Debe tener al menos un número',
			}),
		repeatpassword: z.string(),
		phone: z
			.string()
			.refine(
				(phone) => /^\+\d{10,15}$/.test(phone),
				'Número de teléfono inválido'
			)
			.optional(),
	})
	.refine((data) => data.password === data.repeatpassword, {
		message: 'Las contraseñas no coinciden',
		path: ['repeatpassword'],
	});

export const userFormCampaignValidation = z
	.object({
		name: z
			.string()
			.min(2, 'Debe tener al menos 2 caracteres.')
			.max(50, 'Debe tener menos de 50 caracteres.'),
		password: z
			.string()
			.min(8, { message: 'Debe tener minimo 8 caracteres.' })
			.max(15, { message: 'Debe tener máximo 15 caracteres.' })
			.refine((password) => /[A-Z]/.test(password), {
				message: 'Debe tener al menos una Mayúscula.',
			})
			.refine((password) => /[0-9]/.test(password), {
				message: 'Debe tener al menos un número',
			}),
		repeatpassword: z.string(),
		phone: z
			.string()
			.refine(
				(phone) => /^\+\d{10,15}$/.test(phone),
				'Número de teléfono inválido'
			),
	})
	.refine((data) => data.password === data.repeatpassword, {
		message: 'Las contraseñas no coinciden',
		path: ['repeatpassword'],
	});

export const userLoginFormValidation = z.object({
	email: z.string().email('Debe ser un correo válido.'),
	password: z.string(),
});

export const PatientFormValidation = z.object({
	userId: z.string(),
	name: z
		.string()
		.min(2, 'Nombre debe tener al menos 2 caracteres')
		.max(50, 'Nombre debe tener menos de 50 caracteres'),
	email: z.string().email('Ingrese un correo válido'),
	phone: z
		.string()
		.refine(
			(phone) => /^\+\d{10,15}$/.test(phone),
			'Número de teléfono inválido'
		),
	birthDate: z.coerce.date(),
	civilStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
	gender: z.enum(['male', 'female', 'other']),
	type: z.enum(['adult', 'child']),
	religion: z.string().or(z.literal('')),
	placeOfBirth: z
		.string()
		.min(2, 'Lugar de nacimiento debe tener al menos 2 caracteres'),
	academicGrade: z.string(),
	identificationType: z.string(),
	identificationNumber: z
		.string()
		.min(8, 'N identificación debe tener al menos 8 dígitos'),
	address: z
		.string()
		.min(5, 'Dirección debe tener al menos 5 caracteres')
		.max(500, 'Dirección debe tener menos de 500 caracteres'),
	occupation: z
		.string()
		.min(2, 'Numbero de póliza debe tener al menos 2 caracteres')
		.max(500, 'Numbero de póliza debe tener menos de 500 caracteres')
		.or(z.literal('')),
	emergencyContactName: z
		.string()
		.min(2, 'Contacto de emergencia debe tener al menos 2 caracteres')
		.max(50, 'Contacto de emergencia debe tener menos de 50 caracteres'),
	emergencyContactNumber: z
		.string()
		.refine(
			(emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
			'Número de teléfono de contacto de emergencia inválido'
		),
	privacyConsent: z
		.boolean()
		.default(false)
		.refine((value) => value === true, {
			message: 'Debe dar su consentimiento a la privacidad para continuar',
		}),
});

export const CreateAppointmentSchema = z.object({
	specialty: z.string().min(2, 'Seleccione una especialidad'),
	schedule: z.coerce.date(),
	aditionalInfo: z.string().optional(),
	cancellationReason: z.string().optional(),
	voucherImage: z
		.any()
		.refine((files) => files?.length == 1, 'Adjuntar la imagen de su deposito.')
		.refine((files) => {
			return files?.[0]?.size <= MAX_FILE_SIZE;
		}, 'Adjuntar la imagen de su deposito.')
		.refine((files) => {
			return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
		}, 'Solo .jpg, .jpeg, .png y .webp son archivos permitidos'),
});

export const ScheduleAppointmentSchema = z.object({
	specialty: z.string().min(2, 'Seleccione una especialidad'),
	schedule: z.coerce.date(),
	aditionalInfo: z.string().optional(),
	cancellationReason: z.string().optional(),
	voucherImage: z.custom<File[]>(),
});

export const CancelAppointmentSchema = z.object({
	specialty: z.string().min(2, 'Seleccione una especialidad'),
	schedule: z.coerce.date(),
	aditionalInfo: z.string().optional(),
	cancellationReason: z
		.string()
		.min(2, 'motivo de cancelación debe tener al menos 2 caracteres')
		.max(500, 'motivo de cancelación debe tener menos de 500 caracteres'),
	voucherImage: z.custom<File[]>(),
});

export function getAppointmentSchema(type: string) {
	switch (type) {
		case 'create':
			return CreateAppointmentSchema;
		case 'cancel':
			return CancelAppointmentSchema;
		default:
			return ScheduleAppointmentSchema;
	}
}

export function getRegisterUser(type?: string) {
	return type === 'campaign' ? userFormCampaignValidation : userFormValidation;
}
