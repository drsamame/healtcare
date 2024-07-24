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
			</div>
		</div>
	);
}

export default Success;
