'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { CreateAppointmentSchema } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';
import { SelectItem } from '@/components/ui/select';
import { Doctors } from '@/constants';
import Image from 'next/image';

interface Props {
	userId: string;
	patient: string;
	type: 'create' | 'cancel' | 'schedule';
}

const AppointmentForm = ({ userId, patient, type }: Props) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
		resolver: zodResolver(CreateAppointmentSchema),
		defaultValues: {
			primaryPhysician: '',
			cancellationReason: '',
			schedule: new Date(),
			reason: '',
			note: '',
		},
	});

	async function onSubmit(values: z.infer<typeof CreateAppointmentSchema>) {
		setIsLoading(true);

		let status;

		switch (type) {
			case 'cancel':
				status = 'cancelled';
				break;
			case 'create':
				status = 'pending';
				break;
			case 'schedule':
				status = 'scheduled';
				break;
			default:
				status = 'pending';
				break;
		}

		try {
			const userData = { name, email, phone };
			const res = await createUser(userData);

			if (!res?.error) {
				router.push(`/patients/${res?.data.$id}/register`);
			} else {
				console.log(res.data);
				form.setError('root.serverError', {
					message:
						'Ya existe un usuario con la misma identificación, correo electrónico o teléfono en este proyecto.',
					type: '400',
				});
				console.log(form.formState.errors?.root?.serverError.type);
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
			buttonLabel = 'Crear cita';
			break;
		case 'schedule':
			buttonLabel = 'Agendar cita';
			break;
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
				<section className="mb-12 space-y-4">
					<h1 className="header">Nueva cita!</h1>
					<p className="text-dark-700">
						Solicita una nueva cita en 10 segundos
					</p>
				</section>

				{type !== 'cancel' && (
					<>
						<CustomFormField
							fieldType={FormFieldType.SELECT}
							control={form.control}
							name="primaryPhysician"
							label="Médico primario"
							placeholder="Seleccione un médico"
						>
							{Doctors.map((doctor, i) => (
								<SelectItem key={doctor.name + i} value={doctor.name}>
									<div className="flex cursor-pointer items-center gap-2">
										<Image
											src={doctor.image}
											width={32}
											height={32}
											alt="doctor"
											className="rounded-full border border-dark-500"
										/>
										<p>{doctor.name}</p>
									</div>
								</SelectItem>
							))}
						</CustomFormField>
						<CustomFormField
							fieldType={FormFieldType.DATEPICKER}
							control={form.control}
							name="schedule"
							placeholder="Fecha y Hora de la cita"
							showTimeSelect
							dateFormat="MM/dd/yyyy - h:mm aa"
						></CustomFormField>

						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								fieldType={FormFieldType.TEXTAREA}
								control={form.control}
								name="reason"
								label="Motivo de la cita"
								placeholder='Ej. "Dolor de cabeza intenso"'
							></CustomFormField>
							<CustomFormField
								fieldType={FormFieldType.TEXTAREA}
								control={form.control}
								name="notes"
								label="Notas"
								placeholder='Ej. "Tomar medicamento cada 8 horas"'
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
