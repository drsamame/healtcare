import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from "@/components/ui/theme-provider"
import './globals.css';

import { cn } from '@/lib/utils';

const fontSans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-sans',
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
		<html lang="es">
			{/* eslint-disable @next/next/no-sync-scripts */}
			<body
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
