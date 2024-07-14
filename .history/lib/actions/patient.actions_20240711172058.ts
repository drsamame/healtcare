import { Query, ID } from 'node-appwrite';
import { users } from '../appwite.config';

export const createUser = async (user: CreateUserParams) => {
	try {
		const newUser = await users.create(
			ID.unique(),
			user.email,
			user.phone,
			undefined,
			user.name
		);
	} catch (error: any) {
        console.log(error)
		if (error && error?.code === 409) {
			const existingUser = await users.list([
				Query.equal('email', [user.email]),
			]);

			return existingUser?.users[0];
		}
	} finally {
        console.log('next final')
	}
};
