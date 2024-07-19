export const genderOptions = [
	{
		value: 'male',
		label: 'Masculino',
	},
	{
		value: 'female',
		label: 'Femenino',
	},
	{
		value: 'other',
		label: 'Otro',
	},
];

export const PatientFormDefaultValues = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	birthDate: new Date(Date.now()),
	gender: 'Male' as Gender,
	address: '',
	occupation: '',
	emergencyContactName: '',
	emergencyContactNumber: '',
	primaryPhysician: '',
	insuranceProvider: '',
	insurancePolicyNumber: '',
	allergies: '',
	currentMedication: '',
	familyMedicalHistory: '',
	pastMedicalHistory: '',
	identificationType: 'Birth Certificate',
	identificationNumber: '',
	identificationDocument: [],
	treatmentConsent: false,
	disclosureConsent: false,
	privacyConsent: false,
};

export const IdentificationTypes = [
	'DNI',
	"Pasaporte",
	'Carnet de extranjería',
];

export const Doctors = [
	{
		image: '/assets/images/dr-green.png',
		name: 'John Green',
	},
	{
		image: '/assets/images/dr-cameron.png',
		name: 'Leila Cameron',
	},
	{
		image: '/assets/images/dr-livingston.png',
		name: 'David Livingston',
	},
	{
		image: '/assets/images/dr-peter.png',
		name: 'Evan Peter',
	},
	{
		image: '/assets/images/dr-powell.png',
		name: 'Jane Powell',
	},
	{
		image: '/assets/images/dr-remirez.png',
		name: 'Alex Ramirez',
	},
	{
		image: '/assets/images/dr-lee.png',
		name: 'Jasmine Lee',
	},
	{
		image: '/assets/images/dr-cruz.png',
		name: 'Alyana Cruz',
	},
	{
		image: '/assets/images/dr-sharma.png',
		name: 'Hardik Sharma',
	},
];

export const StatusIcon = {
	scheduled: '/assets/icons/check.svg',
	pending: '/assets/icons/pending.svg',
	cancelled: '/assets/icons/cancelled.svg',
};
