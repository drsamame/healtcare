'use server';
import { Query, ID } from 'node-appwrite';
import { users } from '../appwite.config';
import { parseStringify } from '../utils';

export const createUser = async (user: CreateUserParams) => {
	try {
		const newUser = await users.create(
			ID.unique(),
			user.email,
			user.phone,
			undefined,
			user.name
		);
		return parseStringify(newUser);
	} catch (error: any) {
		if (error && error?.code === 409) {
			const documents = await users.list([Query.equal('email', [user.email])]);
			// throw new Error('An error occurred while creating a new user:');
			const mensajeError = {
				'Codigo Error': 'E009',
				'Mensaje Error': 'El numero no es 2',
			};
			throw mensajeError;
		}
	}
};
