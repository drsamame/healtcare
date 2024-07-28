'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { usePathname, useRouter } from 'next/navigation';
import { decryptKey, encryptKey } from '@/lib/utils';

function PasskeyModal() {
	const [passKey, setPassKey] = useState('');
	const path = usePathname();
	const [open, setOpen] = useState(true);
	const router = useRouter();
	const [error, setError] = useState('');

	const closeModal = () => {
		router.push('/');
		setOpen(false);
	};

	const encryptedKey =
		typeof window !== 'undefined' ? localStorage.getItem('accessKey') : null;

	useEffect(() => {
		const accessKey = encryptedKey && decryptKey(encryptedKey);
		console.log(path)
		if (path) {
			if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
				setOpen(false);
				router.push('/admin');
			} else {
				setOpen(true);
			}
		}
	}, [encryptedKey]);

	const validatePassKey = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
			const encryptedKey = encryptKey(passKey);
			localStorage.setItem('accessKey', encryptedKey);
			setOpen(false);
		} else {
			setError('Clave de acceso incorrecta. Porfavor intenta otra vez');
		}
	};
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent className="shad-alert-dialog">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-start justify-between">
						Verificación de acceso administrador
						<Image
							src="/assets/icons/close.svg"
							alt="close"
							width={20}
							height={20}
							onClick={() => closeModal()}
							className="cursor-pointer"
						></Image>
					</AlertDialogTitle>
					<AlertDialogDescription>
						Para acceder a la interfaz de administrador, ingrese la clave de
						acceso
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div>
					<InputOTP
						maxLength={6}
						value={passKey}
						onChange={(value) => setPassKey(value)}
					>
						<InputOTPGroup className="shad-otp">
							<InputOTPSlot className="shad-otp-slot" index={0} />
							<InputOTPSlot className="shad-otp-slot" index={1} />
							<InputOTPSlot className="shad-otp-slot" index={2} />
							<InputOTPSlot className="shad-otp-slot" index={3} />
							<InputOTPSlot className="shad-otp-slot" index={4} />
							<InputOTPSlot className="shad-otp-slot" index={5} />
						</InputOTPGroup>
					</InputOTP>
					{error && (
						<p className="shad-error text-14-regular mt-4 flex justify-center">
							{error}
						</p>
					)}
				</div>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={(e) => validatePassKey(e)}
						className="shad-primary-btn w-full"
					>
						Ingresar clave de Acceso
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default PasskeyModal;
