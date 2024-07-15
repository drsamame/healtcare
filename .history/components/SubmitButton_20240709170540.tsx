import React from 'react';
import { Button } from '@/components/ui/button';

interface ButtonProps {}

function SubmitButton({ isLoading, className, children }: Props) {
	return <Button type="submit">Submit</Button>;
}

export default SubmitButton;
