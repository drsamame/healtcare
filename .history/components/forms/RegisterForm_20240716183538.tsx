'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { userFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';
import { FormFieldType } from './PatientForm';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { genderOptions } from '@/constants';
import { Label } from '@/components/ui/label';

const RegisterForm = ({ user }: { user: User }) => {
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
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-12 flex-1"
			>
				<section className="mb-12 space-y-4">
					<h1 className="header">Bienvenido! ✋</h1>
					<p className="text-dark-700">Déjanos conocer mas acerca de tí.</p>
				</section>
				<section className="mb-12 space-y-6">
					<div className="mb-9 space-y-1">
						<h2 className="sub-header">Información personal</h2>
					</div>
				</section>

				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name="name"
					label="Nombre completo"
					placeholder="Ej. Juan Pérez"
					iconSrc="/assets/icons/user.svg"
					iconAlt="user"
				/>

				<div className="flex flex-col gap-6 xl:flex-row">
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
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					{' '}
					<CustomFormField
						fieldType={FormFieldType.DATEPICKER}
						control={form.control}
						name="birthDate"
						label="Fecha de nacimiento"
					/>
					<CustomFormField
						fieldType={FormFieldType.SKELETON}
						control={form.control}
						name="gender"
						label=" Género"
						renderSkeleton={(field) => (
							<FormControl>
								<RadioGroup
									className="flex h-11 gap-6 xl:justify-between"
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									{genderOptions.map(({ label, value: option }) => (
										<div key={option} className="radio-group">
											<RadioGroupItem
												value={option}
												id={option}
											></RadioGroupItem>
											<Label htmlFor={option} className="cursor-pointer">
												{label}
											</Label>
										</div>
									))}
								</RadioGroup>
							</FormControl>
						)}
					/>
				</div>

				<div className="flex flex-col gap-6 xl:flex-row">
					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						name="address"
						label="Dirección"
						placeholder="Av. Canada mz. 1 lt. 2"
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
				</div>

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

export default RegisterForm;
