'use server';

import { ID } from 'node-appwrite';
import {
	DATABASE_ID,
	databases,
	APPOINTMENT_COLLECTION_ID,
} from '../appwite.config';
import { parseStringify } from '../utils';

export const createAppointment = async (
	appointmentData: CreateAppointmentParams
) => {
	console.log(appointmentData);
	try {
		const newPatient = await databases.createDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			ID.unique(),
			{
				...appointmentData,
			}
		);

		return parseStringify(newPatient);
	} catch (error: any) {
		console.log(error);
	}
};
