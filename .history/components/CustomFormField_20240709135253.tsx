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
	renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = (props) => {
	<Input type="text" placeholder="Ej. Juan Pérez" />;
};

function CustomFormField(props: Props) {
    const { control, fieldType, name, label } = props 
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{fieldType !== FormFieldType.CHECKBOX && label && (
						<FormLabel htmlFor={name}>{label}</FormLabel>
					)}
                    <RenderField field={field} props={props} ></RenderField>
				</FormItem>
			)}
		/>
	);
}

export default CustomFormField;
