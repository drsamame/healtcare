import PatientForm from '@/components/forms/PatientForm';
import Image from 'next/image';

export default function Home() {
	return (
		<div className="flex h-screen max-h-screen">
			<Image
				alt="patient"
				src="/assets/icons/logo-full.svg"
				height={1000}
				width={1000}
				className="mb-12 h-10 w-fit"
			></Image>
			<PatientForm />
			<div className="text-14-regular mt-20 flex justify-between">
				<p>© 2024 CarePulse</p>
			</div>
		</div>
	);
}
