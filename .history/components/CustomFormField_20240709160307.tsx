'use client';
import React from 'react';

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { FormFieldType } from './forms/PatientForm';
import Image from 'next/image';

interface Props {
	control: Control<any>;
	fieldType: FormFieldType;
	name: string;
	label?: string;
	placeholtder?: string;
	iconSrc?: string;
	iconAlt?: string;
	disabled?: boolean;
	dateFormat?: string;
	showTimeSelect?: boolean;
	children?: React.ReactNode;
    placeholder: string;
	renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: Props }) => {
	const { fieldType, iconSrc, iconAlt, placeholder } = props;
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
						/>
					)}
                    <FormControl>
                        <Input placeholder={placeholder} {...field}></Input>
                    </FormControl>
				</div>
			);
			break;
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
				<FormItem>
                    {JSON.stringify(field)}
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
