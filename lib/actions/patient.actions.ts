'use server';
import { z } from 'zod';
import { PatientFormValidation } from '../validation';
import { AuthError } from 'next-auth';
import { db } from '../db';

export const getPatient = async (id: string) => {
	try {
		const patient = await db.patients.findFirst({
			where: {
				userId: id,
			},
			select: {
				id: true,
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

export const registerPatient = async (
	values: z.infer<typeof PatientFormValidation>
) => {
	try {
		const { data, success } = PatientFormValidation.safeParse(values);
		console.log(data);
		if (!success) {
			return {
				error: 'Invalid data',
			};
		}
		const { id } = await db.patients.create({
			data,
		});
		return { success: true, createdId: id };
	} catch (error) {
		console.log(error);
		if (error instanceof AuthError) {
			return { error: error.cause?.err?.message };
		}
		return { error: 'error 500' };
	}
};
