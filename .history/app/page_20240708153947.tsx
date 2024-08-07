import PatientForm from '@/components/forms/PatientForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<section className='flex h-screen max-h-screen'>
			<div className="sub-container max-w-[496px]">
				<Image
					alt="patient"
					src="/assets/icons/logo-full.svg"
					height={1000}
					width={1000}
					className="mb-12 h-10 w-fit"
				></Image>
				<PatientForm />
				<div className="text-14-regular mt-20 flex justify-between">
					<p className="justify-items-end text-dark-600 xl:text-left">
						© 2024 CarePulse{' '}
					</p>
					<Link href="/?admin=true" className="text-green-500">
						Admin
					</Link>
				</div>
			</div>
      <Image src='/assets/images/onboarding-img.png'></Image>
		</section>
	);
}
