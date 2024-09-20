import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

const publicRoutes = ['/campaign'];
const authRoutes = ['/'];
const adminRoutes = ['/admin'];
const apiAuthPrefix = '/api/auth';

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	const isAdmin = req.auth?.user.role === 'admin';

	// Permitir todas las rutas de API de autenticación
	if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
		return NextResponse.next();
	}

	if (publicRoutes.includes(nextUrl.pathname)) {
		return NextResponse.next();
	}

	// Permitir acceso a rutas públicas sin importar el estado de autenticación
	if (publicRoutes.includes(nextUrl.pathname)) {
		return NextResponse.next();
	}

	// Redirigir a /dashboard si el usuario está logueado y trata de acceder a rutas de autenticación
	// if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
	// 	if (isAdmin) {
	// 		return NextResponse.redirect(new URL('/admin', nextUrl));
	// 	} else {
	// 		return NextResponse.redirect(new URL('/dashboard', nextUrl));
	// 	}
	// }

	// Redirigir a /admin si el usuario está logueado y trata de acceder a rutas protegidas de administrador
	if (isLoggedIn && adminRoutes.includes(nextUrl.pathname) && !isAdmin) {
		return NextResponse.redirect(new URL('/dashboard', nextUrl));
	}

	// Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta protegida
	if (
		!isLoggedIn &&
		!authRoutes.includes(nextUrl.pathname) &&
		!publicRoutes.includes(nextUrl.pathname)
	) {
		return NextResponse.redirect(new URL('/', nextUrl));
	}

	return NextResponse.next();
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
