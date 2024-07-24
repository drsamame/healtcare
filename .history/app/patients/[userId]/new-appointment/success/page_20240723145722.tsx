import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
function Success() {
	return (
		<div className="flex h-screen max-h-screen px-[5%]">
			<div className="success-img">
				<Link href="/">
					<Image
						src="/assets/icons/logo-full.svg"
						alt="logo"
						height={1000}
						width={1000}
						className="h-10 w-fit"
					></Image>
				</Link>
				<section className="">
					<Image
						src="/assets/gifs/success.gif"
						height={300}
						width={280}
						alt="success"
					></Image>
				</section>
				<h2 className="header mb-6 max-w-[600px] text-center">
					Tu <span className="text-green-500">pedido de cita</span> ha sido
					enviada con éxito
				</h2>
			</div>
		</div>
	);
}

export default Success;
