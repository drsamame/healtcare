'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

interface Props {
	children: React.ReactNode;
	session: any;
}

function SessionAuthProvider({ children, session }: Props) {
	return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default SessionAuthProvider;
