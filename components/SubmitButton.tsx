import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Props {
	isLoading: boolean;
	className?: string;
	children: React.ReactNode;
	asChild?: boolean;
}

function SubmitButton({ isLoading, className, children, asChild = false }: Props) {
	return (
		<Button
			asChild={asChild}
			type="submit"
			disabled={isLoading}
			className={className ?? 'shad-primary-btn w-full'}
		>
			{isLoading ? (
				<div className="flex items-center gap-4 ">
					<Image
						src="/assets/icons/loader.svg"
						alt="loader"
						width={24}
						height={24}
						className="animate-spin"
					/>
					Cargando...
				</div>
			) : (
				children
			)}
		</Button>
	);
}

export default SubmitButton;
