'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Services } from '@/constants';
import Image from 'next/image';

import { StatusBadge } from '../StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { AppointmentModal } from '../AppointmentModal';
import Link from 'next/link';

export const columnsAppoiment: ColumnDef<Appointment>[] = [
	{
		accessorKey: 'patient.name',
		header: 'Paciente',
		cell: ({ row }) => {
			const appointment = row.original;
			return (
				<p className="text-14-medium">
					<Link target='_blank' className='underline' href={`/patients/${appointment.userId}/register`}>
						{appointment.patient.name}
					</Link>
				</p>
			);
		},
	},
	{
		accessorKey: 'patient.phone',
		header: 'WhatsApp',
		cell: ({ row }) => {
			const appointment = row.original;
			return <p className="text-14-medium">{appointment.patient.phone}</p>;
		},
	},

	{
		accessorKey: 'schedule',
		header: 'Cita',
		cell: ({ row }) => {
			const appointment = row.original;
			return (
				<p className="text-14-regular min-w-[100px]">
					{formatDateTime(appointment.schedule).dateOnly}
				</p>
			);
		},
	},
	{
		accessorKey: 'specialty',
		header: 'Doctor',
		cell: ({ row }) => {
			const appointment = row.original;

			const doctor = Services.find(
				(doctor) => doctor.name === appointment.specialty
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
					<p className="whitespace-nowrap">{doctor?.name}</p>
				</div>
			);
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
		id: 'actions',
		header: () => <div className="pl-4">Acciones</div>,
		cell: ({ row }) => {
			const appointment = row.original;

			return (
				<div className="flex gap-1">
					<AppointmentModal
						patientId={appointment.patient.id}
						userId={appointment.userId}
						appointment={appointment}
						type="schedule"
						title="Agendar cita"
						description="Por favor completar los detalles para agendar la cita"
					/>
					<AppointmentModal
						patientId={appointment.patient.id}
						userId={appointment.userId}
						appointment={appointment}
						type="cancel"
						title="Cancelar cita"
						description="Estás seguro que deseas cancelar la cita"
					/>
				</div>
			);
		},
	},
];
