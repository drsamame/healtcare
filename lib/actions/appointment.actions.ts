'use server';

import { revalidatePath } from 'next/cache';
import { CreateAppointmentSchema } from '../validation';
import { db } from '../db';
import { AuthError } from 'next-auth';

export const createAppointment = async (
	appointmentData: CreateAppointmentParams
) => {
	try {
		const { data, success } =
			CreateAppointmentSchema.safeParse(appointmentData);

		if (!success) {
			return {
				error: 'Invalid data',
			};
		}
		const { id } = await db.appointment.create({
			data: {
				...data,
				userId: appointmentData.userId,
				patientId: appointmentData.patient,
				status: appointmentData.status,
			},
		});
		return { success: true, createdId: id };
	} catch (error) {
		if (error instanceof AuthError) {
			return { error: error.cause?.err?.message };
		}
		return { error: 'error 500' };
	}
};

export const getAppointment = async (id: string) => {
	try {
		const patient = await db.appointment.findFirst({
			where: {
				id: id,
			},
			select: {
				id: true,
				specialty: true,
				schedule: true,
			},
		});
		if (!patient) return { error: 'Patient not found' };
		return {
			success: true,
			data: {
				...patient,
			},
		};
	} catch (error: any) {
		return { error: 'error 500' };
	}
};

export const getRecentAppointmentList = async () => {
	try {
		const appointments = await db.appointment.findMany({
			orderBy: [
				{
					schedule: 'desc',
				},
			],
			include: {
				patient: true, // All posts where authorId == 20
			},
		});
		const initialCounts = {
			scheduledCount: 0,
			pendingCount: 0,
			cancelledCount: 0,
		};
		const counts = appointments.reduce((acc, appointment) => {
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
		}, initialCounts);
		const data = {
			totalCount: appointments.length,
			...counts,
			appointments,
		};
		return { success: true, data };
	} catch (error) {
		console.log(error);
		if (error instanceof AuthError) {
			return { error: error.cause?.err?.message };
		}
		return { error: 'error 500' };
	}
};

export const updateAppointment = async ({
	appointmentId,
	appointment,
}: UpdateAppointmentParams) => {
	console.log('se loqueo la tabla');
	try {
		const updatedAppointment = await db.appointment.update({
			where: { id: appointmentId },
			data: appointment,
		});
		console.log(updatedAppointment);

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
		// console.log(updatedAppointment)
		revalidatePath('/admin');
		return updatedAppointment;
	} catch (error) {
		console.error('An error occurred while scheduling an appointment:', error);
	}
};
