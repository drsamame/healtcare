'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { userFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';
import { SelectItem } from '@/components/ui/select';
import { Doctors } from '@/constants';
import Image from 'next/image';

interface Props {
	userId: string;
	patient: string;
	type: 'create' | 'cancel';
}

const AppointmentForm = ({ userId, patient, type }: Props) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof userFormValidation>>({
		resolver: zodResolver(userFormValidation),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
		},
	});

	async function onSubmit({
		name,
		email,
		phone,
	}: z.infer<typeof userFormValidation>) {
		setIsLoading(true);
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
					</>
				)}

				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name="name"
					label="Nombre completo"
					placeholder="Ej. Juan Pérez"
					iconSrc="/assets/icons/user.svg"
					iconAlt="user"
				/>
				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name="email"
					label="Correo"
					placeholder="drsamame@gmail.com"
					iconSrc="/assets/icons/email.svg"
					iconAlt="email"
				/>
				<CustomFormField
					fieldType={FormFieldType.PHONE}
					control={form.control}
					name="phone"
					label="Celular"
					placeholder="955061182"
					iconSrc="/assets/icons/email.svg"
					iconAlt="email"
				/>
				<SubmitButton isLoading={isLoading}>Empezar</SubmitButton>
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
