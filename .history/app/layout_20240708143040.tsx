import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const inter = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '500','600', '700'],
	variable: '--font-sans'
});

export const metadata: Metadata = {
	title: 'CarePulse',
	description: 'Un sistema de cuidado de la salud en tiempo real',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
