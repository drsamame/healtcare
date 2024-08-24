'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Doctors } from '@/constants';
import Image from 'next/image';

import { StatusBadge } from '../StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { AppointmentModal } from '../AppointmentModal';

export const columns: ColumnDef<Appointment>[] = [
	{
		header: 'ID',
		cell: ({ row }) => <p className="text-14-medium">{(row.index = 1)}</p>,
	},
	{
		accessorKey: 'patient',
		header: 'Paciente',
		cell: ({ row }) => {
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
		header: () => <div className="pl-4">Acciones</div>,
		cell: ({ row }) => {
			const appointment = row.original;

			return (
				<div className="flex gap-1">
					<AppointmentModal
						patientId={appointment.patient.$id}
						userId={appointment.userId}
						appointment={appointment}
						type="schedule"
						title="Agendar cita"
						description="Por favor completar los detalles para agendar la cita"
					/>
					<AppointmentModal
						patientId={appointment.patient.$id}
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
