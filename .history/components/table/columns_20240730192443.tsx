'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Appointment } from '@/types/appwrite.types';
import { Doctors } from '@/constants';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '../StatusBadge';
import { formatDateTime } from '@/lib/utils';

export const columns: ColumnDef<Appointment>[] = [
	{
		header: 'ID',
		cell: ({ row }) => <p className="text-14-medium">{(row.index = 1)}</p>,
	},
	{
		accessorKey: 'patient',
		header: 'Paciente',
		cell: ({ row }) => {
			const appointment = row.original;
			return <p className="text-14-medium">{row.original.patient?.name}</p>;
		},
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const appointment = row.original;
			return (
				<div className="min-w-[115px]">
					<StatusBadge status={appointment.status} />
				</div>
			);
		},
	},
	{
		accessorKey: 'schedule',
		header: 'Cita',
		cell: ({ row }) => {
			const appointment = row.original;
			return (
				<p className="text-14-regular min-w-[100px]">
					{formatDateTime(appointment.schedule).dateTime}
				</p>
			);
		},
	},
	{
		accessorKey: 'primaryPhysician',
		header: 'Doctor',
		cell: ({ row }) => {
			const appointment = row.original;

			const doctor = Doctors.find(
				(doctor) => doctor.name === appointment.primaryPhysician
			);

			return (
				<div className="flex items-center gap-3">
					<Image
						src={doctor?.image!}
						alt="doctor"
						width={100}
						height={100}
						className="size-8"
					/>
					<p className="whitespace-nowrap">Dr. {doctor?.name}</p>
				</div>
			);
		},
	},
	
	{
		id: 'actions',
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(payment.id)}
						>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
