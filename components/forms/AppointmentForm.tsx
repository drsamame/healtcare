'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { Dispatch, SetStateAction, useState } from 'react';
import { getAppointmentSchema } from '@/lib/validation';
import {
	createAppointment,
	updateAppointment,
} from '@/lib/actions/appointment.actions';
import { useRouter } from 'next/navigation';
import { SelectItem } from '@/components/ui/select';
import { Services } from '@/constants';
import Image from 'next/image';

interface Props {
	userId: string;
	patientId: string;
	appointment?: Appointment;
	type: 'create' | 'cancel' | 'schedule';
	setOpen?: Dispatch<SetStateAction<boolean>>;
}

const AppointmentForm = ({
	userId,
	patientId,
	type,
	appointment,
	setOpen,
}: Props) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const appointmentSchema = getAppointmentSchema(type);

	const form = useForm<z.infer<typeof appointmentSchema>>({
		resolver: zodResolver(appointmentSchema),
		defaultValues: {
			cancellationReason: appointment?.cancellationReason || '',
			schedule: appointment ? new Date(appointment.schedule) : new Date(),
			aditionalInfo: appointment ? appointment.aditionalInfo! : '',
			specialty: appointment ? appointment.specialty : '',
		},
	});

	async function onSubmit(values: z.infer<typeof appointmentSchema>) {
		setIsLoading(true);

		let status;

		switch (type) {
			case 'cancel':
				status = 'cancelled';
				break;
			case 'schedule':
				status = 'scheduled';
				break;
			default:
				status = 'pending';
				break;
		}

		try {
			if (type === 'create' && patientId) {
				const appointmentData = {
					userId,
					patient: patientId,
					schedule: new Date(values.schedule),
					aditionalInfo: values.aditionalInfo!,
					status: status as Status,
					specialty: values.specialty,
				};
				const appointment = await createAppointment(appointmentData);
				if (appointment) {
					form.reset();
					console.log(appointment);
					router.push(`/patients/${appointment?.createdId}/new-appointment/success`);
				}
			} else {
				const appointmentToUpdate = {
					userId,
					appointmentId: appointment!.id,
					type: type!,
					appointment: {
						specialty: values.specialty,
						schedule: new Date(values.schedule),
						status: status as Status,
						aditionalInfo: values.aditionalInfo!,
						cancellationReason: values.cancellationReason!,
					},
				};

				const updatedAppointment = await updateAppointment(appointmentToUpdate);

				if (updatedAppointment) {
					setOpen && setOpen(false);
					form.reset();
				}
			}
		} catch (e: any) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	}
	let buttonLabel;

	switch (type) {
		case 'cancel':
			buttonLabel = 'Cancelar cita';
			break;
		case 'create':
			buttonLabel = 'Separa Tu Atención';
			break;
		case 'schedule':
			buttonLabel = 'Agendar cita';
			break;
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
				{type === 'create' && (
					<>
						<section className="mb-12 space-y-4">
							<h1 className="header">Seleccione la Especialidad</h1>
							<p className="text-dark-700">
								en que desea separar su atención médica.
							</p>
						</section>
					</>
				)}

				{type !== 'cancel' && (
					<>
						<CustomFormField
							fieldType={FormFieldType.SELECT}
							control={form.control}
							name="specialty"
							label="Especialidad"
							placeholder="Seleccione la especialidad para su consulta"
						>
							{Services.map((doctor, i) => (
								<SelectItem key={doctor.name + i} value={doctor.name}>
									<div className="flex cursor-pointer items-center gap-2">
										<Image
											src={doctor.image}
											width={32}
											height={32}
											alt="doctor"
											className="rounded-full border border-dark-500"
										/>
										<p>
											{doctor.name} | Consulta a S/{doctor.price}
											{Number(doctor.discount) > 0 &&
												` (con ${doctor.discount}% dscto.)`}
										</p>
									</div>
								</SelectItem>
							))}
						</CustomFormField>
						<CustomFormField
							fieldType={FormFieldType.DATEPICKER}
							control={form.control}
							name="schedule"
							placeholder="Fecha y Hora de la cita"
							dateFormat="dd/MM/yyyy"
						></CustomFormField>

						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								fieldType={FormFieldType.TEXTAREA}
								control={form.control}
								name="aditionalInfo"
								label="Observación adicional"
								placeholder='Ejemplo: "Dolor de cabeza intenso"'
							></CustomFormField>
						</div>
					</>
				)}

				{type === 'cancel' && (
					<CustomFormField
						fieldType={FormFieldType.TEXTAREA}
						control={form.control}
						name="cancellationReason"
						label="Motivo para cancelar la cita"
						placeholder='Ej. "No puedo asistir"'
					></CustomFormField>
				)}

				<SubmitButton
					className={`${
						type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'
					} w-full`}
					isLoading={isLoading}
				>
					{buttonLabel}
				</SubmitButton>
				{form.formState.errors?.root?.serverError.type == 400 && (
					<p className="text-sm font-medium text-destructive shad-error">
						{form.formState.errors?.root?.serverError.message}
					</p>
				)}
			</form>
		</Form>
	);
};

export default AppointmentForm;
