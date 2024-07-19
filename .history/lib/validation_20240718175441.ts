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

export const PatientFormValidation = z.object({
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
	gender: z.enum(['Male', 'Female', 'Other']),
	address: z
		.string()
		.min(5, 'Dirección debe tener al menos 5 caracteres')
		.max(500, 'Dirección debe tener menos de 500 caracteres'),
	occupation: z
		.string()
		.min(2, 'Ocupación debe tener al menos 2 caracteres')
		.max(500, 'Ocupación debe tener menos de 500 caracteres'),
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
	primaryPhysician: z.string().min(2, 'Seleccione un médico'),
	insuranceProvider: z
		.string()
		.optional()
		.refine((val) => {
			console.log(val)
			console.log(val !== '' && (val.length <= 2 && val.length >= 50))
			return true
		}, {
			message: "Nombre de la aseguradora debe tener entre 2 y 50 caracteres si se proporciona",
		}),
	insurancePolicyNumber: z
		.string()
		.min(2, 'Numbero de póliza debe tener al menos 2 caracteres')
		.max(50, 'Numbero de póliza debe tener menos de 50 caracteres')
		,
	allergies: z.string().optional(),
	currentMedication: z.string().optional(),
	familyMedicalHistory: z.string().optional(),
	pastMedicalHistory: z.string().optional(),
	identificationType: z.string().optional(),
	identificationNumber: z.string().optional(),
	identificationDocument: z.custom<File[]>().optional(),
	treatmentConsent: z
		.boolean()
		.default(false)
		.refine((value) => value === true, {
			message: 'Debe dar su consentimiento al tratamiento para continuar',
		}),
	disclosureConsent: z
		.boolean()
		.default(false)
		.refine((value) => value === true, {
			message: 'Debe dar su consentimiento a la divulgación para continuar',
		}),
	privacyConsent: z
		.boolean()
		.default(false)
		.refine((value) => value === true, {
			message: 'Debe dar su consentimiento a la privacidad para continuar',
		}),
});
