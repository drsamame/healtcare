'use server';

import { revalidatePath } from 'next/cache';
import { CreateAppointmentSchema } from '../validation';
import { db } from '../db';
import { auth } from '@/auth';
import { put } from '@vercel/blob';

export const createAppointment = async (
	appointment: CreateAppointmentParams
) => {
	try {
		const { data, success } = CreateAppointmentSchema.omit({
			voucherImage: true,
		}).safeParse(appointment);
		let url = null;
		if (!success) {
			return {
				error: 'Invalid data',
			};
		}

		if (appointment.voucherImage) {
			const { blobFile, fileName } = Object.fromEntries(
				appointment.voucherImage
			);
			const voucherImage = {
				voucherImage: [blobFile],
			};
			const { success } = CreateAppointmentSchema.pick({
				voucherImage: true,
			}).safeParse(voucherImage);
			if (!success) {
				return {
					error: 'Invalid data',
				};
			}
			const { url: vercelStorageUrl } = await put(
				`vouchers/${fileName}`,
				blobFile,
				{
					access: 'public',
				}
			);
			url = vercelStorageUrl;
		}
		console.log(appointment);
		const { id } = await db.appointment.create({
			data: {
				...data,
				userId: appointment.userId,
				patientId: appointment.patient,
				status: appointment.status,
				voucherDocumentUrl: url,
			},
		});
		return { success: true, createdId: id };
	} catch (error) {
		console.log(error);
		return { error: 'error 500' };
	}
};

export const getAppointment = async (id: string) => {
	const session = await auth();
	if (!session!.user) return { error: 'error 401' };

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
	const session = await auth();
	const userRole = session?.user?.role;
	if (userRole !== 'admin') {
		return { error: 'error 401' };
	}
	try {
		const appointments = await db.appointment.findMany({
			orderBy: [
				{
					schedule: 'desc',
				},
			],
			include: {
				patient: true, 
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
		return { error: 'error 500' };
	}
};

export const updateAppointment = async ({
	appointmentId,
	appointment,
}: UpdateAppointmentParams) => {
	const session = await auth();
	const userRole = session?.user?.role;
	if (userRole !== 'admin') {
		return {
			error: 'Unauthorize',
		};
	}
	try {
		const updatedAppointment = await db.appointment.update({
			where: { id: appointmentId },
			data: appointment,
		});

		if (!updatedAppointment) throw new Error('Appointment not found');

		revalidatePath('/admin');
		return updatedAppointment;
	} catch (error) {
		console.error('An error occurred while scheduling an appointment:', error);
	}
};
