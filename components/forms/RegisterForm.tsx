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
import { createUser } from '@/lib/actions/auth.action';
import { set } from 'date-fns';

const PatientForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof userFormValidation>>({
		resolver: zodResolver(userFormValidation),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			repeatpassword: '',
		},
	});

	async function onSubmit({
		name,
		email,
		password,
		repeatpassword,
	}: z.infer<typeof userFormValidation>) {
		setIsLoading(true);
		try {
			const userData = { name, email, password, repeatpassword };

				const res = await createUser(userData);
				if (res.error) {
					form.setError('root.serverError', {
						message:
							'Correo ya registrado, por favor inicia sesión o intenta con otro correo',
						type: '400',
					});
				} else {
					router.push(`/patients/${res.createdId}/register`);
				}
		} catch (e: any) {
			console.log(e);
		}finally{
			setIsLoading(false);
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
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
					fieldType={FormFieldType.PASSWORD}
					control={form.control}
					name="password"
					label="Nueva Contraseña"
					placeholder="Ingrese una nueva contraseña"
				/>
				<CustomFormField
					fieldType={FormFieldType.PASSWORD}
					control={form.control}
					name="repeatpassword"
					label="Repetir Contraseña"
					placeholder="Repita la nueva contraseña"
				/>
				<SubmitButton isLoading={isLoading}>Registrarme</SubmitButton>
				{form.formState.errors?.root?.serverError.type == 400 && (
					<p className="text-sm font-medium text-destructive shad-error">
						{form.formState.errors?.root?.serverError.message}
					</p>
				)}
			</form>
		</Form>
	);
};
export default PatientForm;
