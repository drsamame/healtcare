import PatientForm from '@/components/forms/PatientForm';
import Image from 'next/image';
import Link from 'next/link';

export default function NewAppointment() {
	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[860px] flex-1 justify-between">
					<Image
						alt="patient"
						src="/assets/icons/logo-full.svg"
						height={1000}
						width={1000}
						className="mb-12 h-10 w-fit"
					></Image>
					<PatientForm />

					<p className="justify-items-end text-dark-600 xl:text-left">
						© 2024 CarePulse{' '}
					</p>
				</div>
			</section>

			<Image
				src="/assets/images/appintment-img.png"
				width={1000}
				height={1000}
				alt="patient"
				className="side-image max-w-[50%]"
			/>
		</div>
	);
}
