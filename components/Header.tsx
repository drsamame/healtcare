import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { UserMenu } from '@/components/DropdownMenu';
import { auth } from '@/auth';
async function Header() {
	const session = await auth();
	const name = session?.user?.name?.[0] || '';
	return (
		<header className="admin-header">
			<Link href="/" className="cursor-pointer">
				<Image
					src="/assets/icons/logo-full2.svg"
					height={32}
					width={162}
					alt="logo"
					className="h-8 w-fit"
				/>
			</Link>

			<UserMenu name={name} />
		</header>
	);
}

export default Header;
