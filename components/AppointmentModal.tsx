'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';


import 'react-datepicker/dist/react-datepicker.css';
import AppointmentForm from './forms/AppointmentForm';

export const AppointmentModal = ({
	patientId,
	userId,
	appointment,
	type,
}: {
	patientId: string;
	userId: string;
	appointment?: Appointment;
	type: 'schedule' | 'cancel';
	title: string;
	description: string;
}) => {
	const [open, setOpen] = useState(false);
	let typeText = type == 'schedule' ? 'Agendar' : 'Cancelar';

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className={`capitalize ${type === 'cancel' && 'text-red-500'}`}
				>
					{typeText}
				</Button>
			</DialogTrigger>
			<DialogContent className="shad-dialog sm:max-w-md">
				<DialogHeader className="mb-4 space-y-3">
					<DialogTitle>{`${typeText} cita`}</DialogTitle>
					<DialogDescription className='lowercase first-letter:uppercase'>
						Por favor completar los detalles para {typeText} la cita
					</DialogDescription>
				</DialogHeader>

				<AppointmentForm
					userId={userId}
					patientId={patientId}
					type={type}
					appointment={appointment}
                    setOpen={setOpen}
				/>
			</DialogContent>
		</Dialog>
	);
};
