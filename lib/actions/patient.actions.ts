'use server';
import { z } from 'zod';
import { PatientFormValidation } from '../validation';
import { db } from '../db';

export const getPatientbyUserId = async (id: string) => {
	try {
		const patient = await db.patients.findFirst({
			where: {
				userId: id,
			}
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

export const getPatientbyId = async (id: string) => {
	try {
		const patient = await db.patients.findFirst({
			where: {
				id: id,
			}
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
		return { error: 'error 500' };
	}
};
