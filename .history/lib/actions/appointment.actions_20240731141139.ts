'use server';

import { ID, Query } from 'node-appwrite';
import {
	DATABASE_ID,
	databases,
	APPOINTMENT_COLLECTION_ID,
} from '../appwite.config';
import { formatDateTime, parseStringify } from '../utils';
import { Appointment } from '@/types/appwrite.types';
import { revalidatePath } from 'next/cache';

export const createAppointment = async (
	appointmentData: CreateAppointmentParams
) => {
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

export const getAppointment = async (appointmentId: string) => {
	try {
		const appointment = await databases.getDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			appointmentId
		);

		return parseStringify(appointment.documents[0]);
	} catch (error) {
		console.error(
			'An error occurred while retrieving the existing patient:',
			error
		);
	}
};

export const getRecentAppointmentList = async () => {
	try {
		const appointments = await databases.listDocuments(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			[Query.orderDesc('$createdAt')]
		);

		const initialCounts = {
			scheduledCount: 0,
			pendingCount: 0,
			cancelledCount: 0,
		};

		const counts = (appointments.documents as Appointment[]).reduce(
			(acc, appointment) => {
				switch (appointment.status) {
					case 'scheduled':
						acc.scheduledCount++;
						break;
					case 'pending':
						acc.pendingCount++;
						break;
					case 'cancelled':
						acc.cancelledCount++;
						break;
				}
				return acc;
			},
			initialCounts
		);

		const data = {
			totalCount: appointments.total,
			...counts,
			documents: appointments.documents,
		};

		return parseStringify(data);
	} catch (error) {
		console.error(
			'An error occurred while retrieving the recent appointments:',
			error
		);
	}
};

export const updateAppointment = async ({
	appointmentId,
	userId,
	timeZone,
	appointment,
	type,
}: UpdateAppointmentParams) => {
	try {
		const updatedAppointment = await databases.updateDocument(
			DATABASE_ID!,
			APPOINTMENT_COLLECTION_ID!,
			appointmentId,
			appointment
		);

		if (!updatedAppointment) throw new Error('Appointment not found');

		// const smsMessage = `Greetings from CarePulse. ${
		// 	type === 'schedule'
		// 		? `Your appointment is confirmed for ${
		// 				formatDateTime(appointment.schedule!, timeZone).dateTime
		// 		  } with Dr. ${appointment.primaryPhysician}`
		// 		: `We regret to inform that your appointment for ${
		// 				formatDateTime(appointment.schedule!, timeZone).dateTime
		// 		  } is cancelled. Reason:  ${appointment.cancellationReason}`
		// }.`;
		//await sendSMSNotification(userId, smsMessage);

		revalidatePath('/admin');
		return parseStringify(updatedAppointment);
	} catch (error) {
		console.error('An error occurred while scheduling an appointment:', error);
	}
};
