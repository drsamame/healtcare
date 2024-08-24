'use client';
import { signOut } from 'next-auth/react';

export const SignOut = () => {
	return (
		<button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
			Sign Out s
		</button>
	);
};
