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
		return { error: false, data: parseStringify(newUser) };
	} catch (error: any) {
		if (error && error?.code === 409) {
			const existingUser = await users.list([
				Query.equal('email', [user.email]),
			]);
			return { error: true, data: error.response };
		}
	}
};

export const getUser = async (userId: string) => {
	try {
		const user = await users.get(userId);

		return parseStringify(user);
	} catch (error: any) {
		console.log(error)
	}
};
