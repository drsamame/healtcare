import { ID } from 'node-appwrite';
import { DATABASE_ID, PATIENT_COLLECTION_ID } from '../appwite.config';

export const CreateAppointment = async (appointmentData: CreateAppointmentParams) => {
	try {
		const newPatient = await databases.createDocument(
			DATABASE_ID!,
			PATIENT_COLLECTION_ID!,
			ID.unique(),
			{
				...patient,
			}
		);

		return parseStringify(newPatient);
	} catch (error: any) {}
};
