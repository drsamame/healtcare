'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl } from '@/components/ui/form';
import CustomFormField, { FormFieldType } from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerPatient } from '@/lib/actions/patient.actions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	AcademicGrade,
	CivilStatusOptions,
	genderOptions,
	IdentificationTypes,
	PatientFormDefaultValues,
	typeForm,
} from '@/constants';
import { Label } from '@/components/ui/label';
import { SelectItem } from '@/components/ui/select';
import { PatientFormValidation } from '@/lib/validation';

const RegisterForm = ({ user }: { user: User }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<z.infer<typeof PatientFormValidation>>({
		resolver: zodResolver(PatientFormValidation),
		defaultValues: {
			...PatientFormDefaultValues,
			userId: user.id,
			name: user.name,
			email: user.email,
		},
	});

	const isAdult = form.getValues('type') === 'adult';

	const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
		setIsLoading(true);
		try {
			const patient = {
				userId: values.userId,
				name: values.name,
				email: values.email,
				phone: values.phone,
				birthDate: new Date(values.birthDate),
				civilStatus: values.civilStatus,
				gender: values.gender,
				type: values.type,
				religion: values.religion,
				placeOfBirth: values.placeOfBirth,
				academicGrade: values.academicGrade,
				identificationType: values.identificationType,
				identificationNumber: values.academicGrade,
				address: values.address,
				occupation: values.occupation,
				emergencyContactName: values.emergencyContactName,
				emergencyContactNumber: values.emergencyContactNumber,
				privacyConsent: values.privacyConsent,
			};
			const newPatient = await registerPatient(patient);
			if (newPatient) {
				router.push(`/patients/${values.userId}/new-appointment`);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
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
						<CustomFormField
							fieldType={FormFieldType.DATEPICKER}
							control={form.control}
							name="birthDate"
							label="Fecha de nacimiento"
						/>
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							control={form.control}
							name="placeOfBirth"
							label="Lugar de nacimiento"
							placeholder="Magdalena del Mar"
						/>
					</div>

					<div className="flex flex-col gap-6 xl:flex-row">
						<CustomFormField
							fieldType={FormFieldType.SELECT}
							control={form.control}
							name="academicGrade"
							label="Nivel académico"
							placeholder="Seleccione una opción"
						>
							{AcademicGrade.map((el, i) => (
								<SelectItem key={el} value={el}>
									{el}
								</SelectItem>
							))}
						</CustomFormField>
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
					</div>
					<div className="flex flex-col gap-6 xl:flex-row">
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							control={form.control}
							name="emergencyContactName"
							label="Nombre de contacto de emergencia"
							placeholder="Ritha Irene Salazar Escajadillo"
						/>
						<CustomFormField
							fieldType={FormFieldType.PHONE}
							control={form.control}
							name="emergencyContactNumber"
							label="Número de contacto de emergencia"
							placeholder="955061182"
						/>
					</div>
				</section>
				<section className="mb-12 space-y-6">
					<div className="mb-9 space-y-1">
						<h2 className="sub-header">Identificación y Verificación</h2>
					</div>
					<div className="flex flex-col gap-6 xl:flex-row">
						<CustomFormField
							fieldType={FormFieldType.SELECT}
							control={form.control}
							name="identificationType"
							label="Tipo de identificación"
							placeholder="Seleccione un tipo de identificación"
						>
							{IdentificationTypes.map((identification, i) => (
								<SelectItem key={identification} value={identification}>
									{identification}
								</SelectItem>
							))}
						</CustomFormField>
						<CustomFormField
							fieldType={FormFieldType.SKELETON}
							control={form.control}
							name="type"
							label="Tipo de paciente"
							renderSkeleton={(field) => (
								<FormControl>
									<RadioGroup
										className="flex h-11 gap-6 xl:justify-between"
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										{typeForm.map(({ label, value: option }) => (
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
							name="identificationNumber"
							label="Número de identificación"
							placeholder="1234565789"
						/>
						<CustomFormField
							fieldType={FormFieldType.SELECT}
							control={form.control}
							name="civilStatus"
							label="Estado civil"
							placeholder="Seleccione un estado civil"
						>
							{CivilStatusOptions.map(({ label, value }, i) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</CustomFormField>
					</div>

					{isAdult && (
						<div className="flex flex-col gap-6 xl:flex-row">
							<CustomFormField
								fieldType={FormFieldType.INPUT}
								control={form.control}
								name="occupation"
								label="Ocupación"
								placeholder="Software Developer"
							/>
							<CustomFormField
								fieldType={FormFieldType.INPUT}
								control={form.control}
								name="religion"
								label="Religión"
								placeholder="Católico, Cristiano, etc."
							/>
						</div>
					)}
				</section>
				<section className="mb-12 space-y-6">
					<div className="mb-9 space-y-1">
						<h2 className="sub-header">Consentimiento y Privacidad</h2>
					</div>

					<CustomFormField
						fieldType={FormFieldType.CHECKBOX}
						control={form.control}
						name="privacyConsent"
						label="Yo conciento las políticas de privacidad de la clínica."
					/>
				</section>

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
