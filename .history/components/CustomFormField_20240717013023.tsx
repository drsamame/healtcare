'use client';
import React from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectValue,
	SelectContent,
	SelectTrigger,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Control, Form } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput, { type Value } from 'react-phone-number-input';
import { es } from 'date-fns/locale/es';
registerLocale('es', es);

interface Props {
	control: Control<any>;
	fieldType: FormFieldType;
	name: string;
	label?: string;
	iconSrc?: string;
	iconAlt?: string;
	disabled?: boolean;
	dateFormat?: string;
	showTimeSelect?: boolean;
	children?: React.ReactNode;
	placeholder?: string;
	renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: Props }) => {
	const {
		fieldType,
		iconSrc,
		iconAlt,
		placeholder,
		showTimeSelect,
		dateFormat,
		renderSkeleton,
	} = props;
	switch (fieldType) {
		case FormFieldType.INPUT:
			return (
				<div className="flex rounded-md border border-dark-500 bg-dark-400">
					{iconSrc && (
						<Image
							src={iconSrc}
							height={24}
							alt={iconAlt || 'icon'}
							width={24}
							className="ml-2"
						/>
					)}
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}
							className="shad-input border-0"
						></Input>
					</FormControl>
				</div>
			);
		case FormFieldType.PHONE:
			return (
				<FormControl>
					<PhoneInput
						placeholder={placeholder}
						defaultCountry="PE"
						international
						withCountryCallingCode
						value={field.value as Value | undefined}
						onChange={field.onChange}
						className="input-phone"
					/>
				</FormControl>
			);
		case FormFieldType.DATEPICKER:
			return (
				<div className="flex rounded-md border border-dark-500 bg-dark-400">
					<Image
						src="/assets/icons/calendar.svg"
						height={24}
						width={24}
						alt="calendar"
						className="ml-2"
					/>
					<FormControl>
						<DatePicker
							locale="es"
							selected={field.value}
							onChange={(date) => field.onChange(date)}
							dateFormat={dateFormat ?? 'MM/dd/yyyy'}
							showTimeSelect={showTimeSelect ?? false}
							timeInputLabel="Time:"
							wrapperClassName="date-picker"
						/>
					</FormControl>
				</div>
			);
		case FormFieldType.SELECT:
			return (
				<FormControl>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl >
							<SelectTrigger className="shad-select-trigger">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent className="shad-select-content">
							{props.children}
						</SelectContent>
					</Select>
				</FormControl>
			);
		case FormFieldType.SKELETON:
			return renderSkeleton ? renderSkeleton(field) : null;
		default:
			break;
	}
	return <Input type="text" placeholder="Ej. Juan Pérez" />;
};

function CustomFormField(props: Props) {
	const { control, fieldType, name, label } = props;
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="flex-1">
					{fieldType !== FormFieldType.CHECKBOX && label && (
						<FormLabel htmlFor={name}>{label}</FormLabel>
					)}
					<RenderField field={field} props={props}></RenderField>
					<FormMessage className="shad-error" />
				</FormItem>
			)}
		/>
	);
}

export default CustomFormField;
