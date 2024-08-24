import React from 'react';
import Image from 'next/image';
import RegisterForm from '@/components/forms/RegisterPatientForm';
import { getUser } from '@/lib/actions/auth.action';

async function Register({ params: { userId } }: SearchParamProps) {
	const user = await getUser(userId);
	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container">
				<div className="sub-container max-w-[860px] flex-1 flex-col py-10">
					<Image
						alt="patient"
						src="/assets/icons/logo-full2.svg"
						height={1000}
						width={1000}
						className="mb-12 h-10 w-fit"
					></Image>
					<RegisterForm user={user.data as User} />
					<p className="copyright py-12">
						© 2024 CarePulse{' '}
					</p>
				</div>
			</section>

			<Image
				src="/assets/images/register-img.png"
				width={1000}
				height={1000}
				alt="patient"
				className="side-image max-w-[390px]"
			/>
		</div>
	);
}

export default Register;
