import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import { userLoginFormValidation } from '@/lib/validation';
import { db } from './lib/db';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const { data, success } =
					userLoginFormValidation.safeParse(credentials);

				if (!success) {
					throw new Error('Invalid credentials');
				}

				const user = await db.user.findUnique({
					where: {
						email: data.email,
					},
				});

				if (!user || !user.password) {
					throw new Error('No user found');
				}

				// verificar si la contraseña es correcta
				const isValid = await bcrypt.compare(data.password, user.password);

				if (!isValid) {
					throw new Error('Incorrect password');
				}

				return { ...user, password: '_hidden_' };
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			return { ...token, ...user };
		},
		session({ session, token }) {
			session.user = token as any;
			return session;
		}
	},
} satisfies NextAuthConfig;
