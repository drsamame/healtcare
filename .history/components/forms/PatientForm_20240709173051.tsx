'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { userFormValidation } from '@/lib/validation';

export enum FormFieldType {
	INPUT = 'input',
	CHECKBOX = 'checkbox',
	TEXTAREA = 'textarea',
	PHONE = 'phone',
	DATEPICKER = 'datepicker',
	SELECT = 'select',
	SKELETON = 'skeleton',
}

const PatientForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof userFormValidation>>({
		resolver: zodResolver(userFormValidation),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit({name, email, phone}: z.infer<typeof userFormValidation>) {
		setIsLoading(true);
		try{
			const userData = { name, email, phone}
			const user = await createUser(userData)
		}catch(e){}finally{setIsLoading(false);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
				<section className="mb-12 space-y-4">
					<h1 className="header">Hola!</h1>
					<p className="text-dark-700">Programa tu primera cita</p>
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
			</form>
		</Form>
	);
};

export default PatientForm;
