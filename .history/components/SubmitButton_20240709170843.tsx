import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Props {
	isLoading: boolean;
	className?: string;
	children: React.ReactNode;
}

function SubmitButton({ isLoading, className, children }: Props) {
	return (
		<Button
			type="submit"
			disabled={isLoading}
			className={className ?? 'shad-primary-btn w-full'}
		>
			{isLoading ? (
				<div className="flex items-center gap-4 ">
					<Image
						src="/assets/icons/spinner.svg"
						alt="loader"
						className="animate-spin"
					></Image>
				</div>
			) : (
				children
			)}
		</Button>
	);
}

export default SubmitButton;
