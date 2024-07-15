import PatientForm from '@/components/forms/PatientForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				
			</section>

			<Image
				src="/assets/images/onboarding-img.png"
				width={1000}
				height={1000}
				alt="patient"
			></Image>
		</div>
	);
}
