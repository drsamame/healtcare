'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';

export enum FormFieldType {
	INPUT = 'input',
	CHECKBOX = 'checkbox',
	TEXTAREA = 'textarea',
	PHONE = 'phone',
	DATEPICKER = 'datepicker',
	SELECT = 'select',
	SKELETON = 'skeleton',
}

const formSchema = z.object({
	username: z.string().min(2, {
		message: 'Username must be at least 2 characters.',
	}),
});

const PatientForm = () => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
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
				<SubmitButton />
			</form>
		</Form>
	);
};

export default PatientForm;
