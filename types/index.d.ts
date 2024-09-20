/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
	params: { [key: string]: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = 'male' | 'female' | 'other';
declare type TypeForm = 'child' | 'adult';
declare type Status = 'pending' | 'scheduled' | 'cancelled';
declare type CivilStatus = 'single' | 'married' | 'divorced' | 'widowed';

declare interface CreateUserParams {
	name: string;
	email: string;
	phone?: string;
	password: string;
	repeatpassword: string;
}

declare interface LoginUser {
	email: string;
	password: string;
}

declare interface User {
	id: string;
	name: string;
	email: string;
	cellphone: string | null;
	emailVerified: string | null;
	role: string;
}

declare type Patient = {
	name: string;
	id: string;
};

declare type Appointment = {
	id: string;
	aditionalInfo: string | null;
	schedule: Date;
	userId: string;
	specialty: string;
	cancellationReason: string | null;
	patient: Patient;
	status: Status;
	voucherDocumentUrl: string | undefined;
};

declare type CreateAppointmentParams = {
	userId: string;
	patient: string;
	specialty: string;
	aditionalInfo: string;
	schedule: Date;
	voucherImage: FormData | null | undefined;
	status: Status;
};

declare type UpdateAppointmentParams = {
	appointmentId: string;
	userId: string;
	type: string;
	appointment: {
		specialty: string;
		schedule: Date;
		status: Status;
		aditionalInfo: string;
	};
};
