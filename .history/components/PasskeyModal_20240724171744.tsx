'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

function PasskeyModal() {
	const [open, setOpen] = useState(true);
	const router = useRouter();
	const closeModal = (value: boolean) => {
		setOpen(false);
		router.push('/');
	};
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent className='shard-alert-dialog'>
				<AlertDialogHeader>
					<AlertDialogTitle className='flex items-start justify-between'>
						Verificación de acceso administrador
						<Image
							src="/assets/icons/close.svg"
							alt="close"
							width={20}
							height={20}
							onClick={() => closeModal(false)}
							className="cursor-pointer"
						></Image>
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default PasskeyModal;
