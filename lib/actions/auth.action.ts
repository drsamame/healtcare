'use server';
import { z } from 'zod';
import { userLoginFormValidation, userFormValidation } from '@/lib/validation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { db } from '../db';
import bcrypt from 'bcryptjs';

export const login = async (
	values: z.infer<typeof userLoginFormValidation>
) => {
	try {
		await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false,
		});

		return { success: true };
	} catch (error) {
		if (error instanceof AuthError) {
			return { error: error.cause?.err?.message };
		}
		return { error: 'error 500' };
	}
};

export const createUser = async (values: CreateUserParams) => {
	try {
		const { data, success } = userFormValidation.safeParse(values);
		console.log(data)
		if (!success) {
			return {
				error: 'Invalid data',
			};
		}

		// verificar si el usuario ya existe
		const user = await db.user.findUnique({
			where: {
				email: data.email,
			},
			include: {
				accounts: true, // Incluir las cuentas asociadas
			},
		});

		if (user) {
			// Verificar si tiene cuentas OAuth vinculadas
			const oauthAccounts = user.accounts.filter(
				(account) => account.type === 'oauth'
			);
			if (oauthAccounts.length > 0) {
				return {
					error:
						'To confirm your identity, sign in with the same account you used originally.',
				};
			}
			return {
				error: 'User already exists',
			};
		}

		// hash de la contraseña
		const passwordHash = await bcrypt.hash(data.password, 10);

		// crear el usuario
		const { id } = await db.user.create({
			data: {
				email: data.email,
				name: data.name,
				password: passwordHash,
				cellphone: data.phone || '',
			},
		});
		await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		return { success: true, createdId: id };
	} catch (error) {
		if (error instanceof AuthError) {
			return { error: error.cause?.err?.message };
		}
		return { error: 'error 500' };
	}
};

export const getUser = async (userId: string) => {
	try {
		const user = await db.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (!user) return { error: 'User not found' };
		return {
			success: true,
			data: {
				id: user!.id,
				name: user!.name,
				email: user!.email,
				cellphone: user?.cellphone,
				emailVerified: user?.emailVerified,
				role: user!.role,
			},
		};
	} catch (error: any) {
		return { error: 'error 500' };
	}
};
