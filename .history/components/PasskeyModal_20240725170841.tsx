'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

function PasskeyModal() {
	const [passKey, setPassKey] = useState('');
	const [open, setOpen] = useState(true);
	const router = useRouter();

	const closeModal = () => {
		router.push('/');
		setOpen(false);
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
						Para acceder a la interfaz de administrador, ingrese la clave OTP
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div>
					<InputOTP
						maxLength={6}
						value={passKey}
						onChange={(value) => setPassKey}
					>
						<InputOTPGroup className="shad-otp">
							<InputOTPSlot className="shad-otp-slop" index={0} />
							<InputOTPSlot className="shad-otp-slop" index={1} />
							<InputOTPSlot className="shad-otp-slop" index={2} />
							<InputOTPSlot className="shad-otp-slop" index={3} />
							<InputOTPSlot className="shad-otp-slop" index={4} />
							<InputOTPSlot className="shad-otp-slop" index={5} />
						</InputOTPGroup>
					</InputOTP>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default PasskeyModal;
