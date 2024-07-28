'use client';
import PatientForm from '@/components/forms/PatientForm';
import PasskeyModal from '@/components/PasskeyModal';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home({ searchParams }: SearchParamProps) {
	const isAdmin = searchParams?.admin === 'true';
	console.log(searchParams);
	useEffect(() => {
		console.log(searchParams);
		console.log('render');
	}, [searchParams]);
	return (
		<div className="flex h-screen max-h-screen">
			{isAdmin && <PasskeyModal />}

			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[496px]">
					<Image
						alt="patient"
						src="/assets/icons/logo-full.svg"
						height={1000}
						width={1000}
						className="mb-12 h-10 w-fit"
					></Image>
					<PatientForm />
					{JSON.stringify(searchParams)}
					<div className="text-14-regular mt-20 flex justify-between">
						<p className="justify-items-end text-dark-600 xl:text-left">
							© 2024 CarePulse
						</p>
						<Link href="/?admin=true" className="text-green-500">
							Admin
						</Link>
					</div>
				</div>
			</section>

			<Image
				src="/assets/images/onboarding-img.png"
				width={1000}
				height={1000}
				alt="patient"
				className="side-image max-w-[50%]"
			/>
		</div>
	);
}
