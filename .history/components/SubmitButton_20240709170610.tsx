import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
}

function SubmitButton({ isLoading, className, children }: Props) {
	return <Button type="submit">Submit</Button>;
}

export default SubmitButton;