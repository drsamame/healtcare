'use client'
import React from 'react'

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
function CustomFormField() {
  return (
    <FormField
    control={form.control}
    name="username"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
                This is your public display name.
            </FormDescription>
            <FormMessage />
        </FormItem>
    )}
/>
  )
}

export default CustomFormField