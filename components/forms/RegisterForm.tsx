'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { getRegisterUser } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/auth.action';

const PatientForm = ({ campaign = false }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const userSchema = campaign
		? getRegisterUser('campaign')
		: getRegisterUser();

	const form = useForm<CreateUserParams>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			repeatpassword: '',
			phone: '',
		},
	});

	async function onSubmit(values: CreateUserParams) {
		setIsLoading(true);
		try {
			const userData = values;
			if (!values.email) {
				userData.email = `${Math.random()
					.toString(36)
					.slice(2, 7)}@yopmail.com`;
			}

			const res = await createUser(userData);
			if (res.error) {
				form.setError('root.serverError', {
					message:
						'Celular ya registrado, por favor inicia sesión o intenta con otro celular',
					type: '400',
				});
			} else {
				router.push(`/patients/${res.createdId}/register`);
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
				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name="name"
					label="Nombre Completo"
					placeholder="Ej. Luis Gonzalo Pérez Silva"
					iconSrc="/assets/icons/user.svg"
					iconAlt="user"
				/>
				{campaign ? (
					<CustomFormField
						fieldType={FormFieldType.PHONE}
						control={form.control}
						name="phone"
						label="Celular"
						iconSrc="/assets/icons/email.svg"
						iconAlt="email"
					/>
				) : (
					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						name="email"
						label="Correo"
						placeholder="Ingresa tu correo electrónico"
						iconSrc="/assets/icons/email.svg"
						iconAlt="email"
					/>
				)}

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
