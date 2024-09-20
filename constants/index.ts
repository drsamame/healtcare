export const genderOptions = [
	{
		value: 'male',
		label: 'Masculino',
	},
	{
		value: 'female',
		label: 'Femenino',
	},
];

export const PatientFormDefaultValues = {
	userId: '',
	name: '',
	email: '',
	phone: '',
	birthDate: new Date(Date.now()),
	civilStatus: 'single' as CivilStatus,
	gender: 'male' as Gender,
	type: 'adult' as TypeForm,
	religion: '',
	placeOfBirth: '',
	academicGrade: 'Secundaria',
	identificationType: 'DNI',
	identificationNumber: '',
	address: '',
	occupation: '',
	emergencyContactName: '',
	emergencyContactNumber: '',
	privacyConsent: false,
};

export const IdentificationTypes = [
	'DNI',
	'Pasaporte',
	'Carnet de Extranjería',
];

export const CivilStatusOptions = [
	{
		value: 'single',
		label: 'Soltero',
	},
	{
		value: 'married',
		label: 'Casado',
	},
	{
		value: 'divorced',
		label: 'Divorciado',
	},
	{
		value: 'widowed',
		label: 'Viudo',
	},
];

export const typeForm = [
	{
		value: 'adult',
		label: 'Adulto',
	},
	{
		value: 'child',
		label: 'Niño',
	},
];

export const AcademicGrade = [
	'Inicial',
	'Primaria',
	'Secundaria',
	'Técnica Superior',
	'Universitaria',
	'Sin Estudios',
];

export const Services = [
	{
		image: '/assets/images/service.png',
		name: 'Cardiología',
		price: 30,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Cirugía General',
		price: 30,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Cirugía Oncológica',
		price: 35,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Cirugía Pediátrica',
		price: 35,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Cirugía Plástica',
		price: 30,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Dermatología',
		price: 35,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Gastroenterología',
		price: 30,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Ginecología',
		price: 30,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Medicina General',
		price: 35,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Medicina Interna',
		price: 35,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Neurología',
		price: 35,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Nutrición',
		price: 30,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Odontología',
		price: 17,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Oftalmología ',
		price: 30,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Otorrinolaringología',
		price: 35,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Pediatría',
		price: 35,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Reumatología',
		price: 30,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Terapia Física y Rehabilitación',
		price: 17,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Traumatología',
		price: 30,
		discount: 0
	},
	{
		image: '/assets/images/service.png',
		name: 'Neumología',
		price: 70,
		discount: 50
	},
	{
		image: '/assets/images/service.png',
		name: 'Psicología',
		price: 70,
		discount: 50
	},
	{
		image: '/assets/images/service.png',
		name: 'Urología',
		price: 70,
		discount: 50
	},
];

export const ReportTypeNames = {
	APPOIMENTSREPORT: 'Reporte de citas'
}

export const StatusIcon = {
	scheduled: '/assets/icons/check.svg',
	pending: '/assets/icons/pending.svg',
	cancelled: '/assets/icons/cancelled.svg',
};
