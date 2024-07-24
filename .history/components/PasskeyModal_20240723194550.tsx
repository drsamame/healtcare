"use client";

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

function PasskeyModal() {
	const [open, setOpen] = useState(true);
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Verificación de acceso administrador?
                        <Image></Image>

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
