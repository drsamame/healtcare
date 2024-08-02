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
import { Appointment } from '@/types/appwrite.types';

// import { AppointmentForm } from './forms/AppointmentForm';

import 'react-datepicker/dist/react-datepicker.css';

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
					className={`capitalize ${type === 'schedule' && 'text-green-500'}`}
				>
					{typeText}
				</Button>
			</DialogTrigger>
			<DialogContent className="shad-dialog sm:max-w-md">
				<DialogHeader className="mb-4 space-y-3">
					<DialogTitle>{`${typeText}${' '}cita`}</DialogTitle>
					<DialogDescription>
						Please fill in the following details to {type} appointment
					</DialogDescription>
				</DialogHeader>

				{/* <AppointmentForm
					userId={userId}
					patientId={patientId}
					type={type}
					appointment={appointment}
					setOpen={setOpen}
				/> */}
			</DialogContent>
		</Dialog>
	);
};
