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
		console.log(newUser);
		return parseStringify(newUser);
	} catch (error: any) {
		console.log(error);
		if (error && error?.code === 409) {
			const existingUser = await users.list([
				Query.equal('email', [user.email]),
			]);
			throw new Error('An error occurred while creating a new user:', {
				cause: JSON.stringify(existingUser),
			});
		}
	}
};
