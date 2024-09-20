import React from 'react';
import Image from 'next/image';
import { getUser } from '@/lib/actions/auth.action';
import RegisterPayment from '@/components/forms/registerPatientPayment';

async function Register({ params: { userId } }: SearchParamProps) {
	const user = await getUser(userId);
	console.log(user);
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
					<RegisterPayment user={user.data as User} />
					<p className="copyright py-12">© 2024 Solidaridad San Lorenzo® </p>
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
