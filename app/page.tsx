
import Image from 'next/image';
import LoginTabs from '@/components/LoginTabs';
export default function Home() {
	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[496px]">
					<Image
						alt="patient"
						src="/assets/icons/logo-full2.svg"
						height={1000}
						width={1000}
						className="mb-12 h-12 w-fit"
					></Image>
					<LoginTabs />
					<div className="text-14-regular mt-20 flex justify-between">
						<p className="justify-items-end text-dark-600 xl:text-left">
							© 2024 Solidaridad San Lorenzo®
						</p>
					</div>
				</div>
			</section>

			<Image
				src="/assets/images/onboarding-img.jpg"
				width={1000}
				height={1000}
				alt="patient"
				className="side-image max-w-[50%] h-[100vh]"
			/>
		</div>
	);
}
