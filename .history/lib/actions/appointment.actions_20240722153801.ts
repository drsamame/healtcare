'use server';

import { ID } from 'node-appwrite';
import {
	DATABASE_ID,
	databases,
	PATIENT_COLLECTION_ID,
} from '../appwite.config';
import { parseStringify } from '../utils';

export const createAppointment = async (
	appointmentData: CreateAppointmentParams
) => {
	try {
		const newPatient = await databases.createDocument(
			DATABASE_ID!,
			PATIENT_COLLECTION_ID!,
			ID.unique(),
			{
				...appointmentData,
			}
		);

		return parseStringify(newPatient);
	} catch (error: any) {}
};
