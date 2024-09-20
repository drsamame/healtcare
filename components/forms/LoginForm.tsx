'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { startTransition, useState, useTransition } from 'react';
import { userLoginFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/actions/auth.action';
import { useSession } from 'next-auth/react';

const LoginForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const session = useSession();
	const form = useForm<z.infer<typeof userLoginFormValidation>>({
		resolver: zodResolver(userLoginFormValidation),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof userLoginFormValidation>) {
		setIsLoading(true);
		try {
			const response = await login(values);
			if (response.error) {
				form.setError('root.serverError', {
					message:
						'Hubo un error al iniciar sesión, por favor verifica tus credenciales',
					type: '400',
				});
				return;
			}else{
				router.push('/admin');
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
					name="email"
					label="Correo"
				placeholder="Ingresa tu correo electrónico"
					iconSrc="/assets/icons/email.svg"
					iconAlt="email"
				/>
				<CustomFormField
					fieldType={FormFieldType.PASSWORD}
					control={form.control}
					name="password"
					label="Contraseña"
					placeholder="Ingrese su ontraseña"
				/>
				<SubmitButton isLoading={isLoading}>Ingresar</SubmitButton>
				{form.formState.errors?.root?.serverError.type == 400 && (
					<p className="text-sm font-medium text-destructive shad-error">
						{form.formState.errors?.root?.serverError.message}
					</p>
				)}
			</form>
		</Form>
	);
};

export default LoginForm;
