import Image from 'next/image';
import Link from 'next/link';

import { StatCard } from '@/components/StatCard';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';

type Payment = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

export const payments: Payment[] = [
	{
		id: '728ed52f',
		amount: 100,
		status: 'pending',
		email: 'm@example.com',
	},
	{
		id: '489e1d42',
		amount: 125,
		status: 'processing',
		email: 'example@gmail.com',
	},
	// ...
];

const AdminPage = async () => {
	const appointments = await getRecentAppointmentList();

	return (
		<div className="mx-auto flex max-w-7xl flex-col space-y-14">
			<header className="admin-header">
				<Link href="/" className="cursor-pointer">
					<Image
						src="/assets/icons/logo-full.svg"
						height={32}
						width={162}
						alt="logo"
						className="h-8 w-fit"
					/>
				</Link>

				<p className="text-16-semibold">Panel de administración</p>
			</header>

			<main className="admin-main">
				<section className="w-full space-y-4">
					<h1 className="header">Bienvenido 👋</h1>
					<p className="text-dark-700">
						Empieza el día administrando las nuevas citas
					</p>
				</section>

				<section className="admin-stat">
					<StatCard
						type="appointments"
						count={appointments.scheduledCount}
						label="Citas programadas"
						icon={'/assets/icons/appointments.svg'}
					/>
					<StatCard
						type="pending"
						count={appointments.pendingCount}
						label="Citas pendientes"
						icon={'/assets/icons/pending.svg'}
					/>
					<StatCard
						type="cancelled"
						count={appointments.cancelledCount}
						label="Citas canceladas"
						icon={'/assets/icons/cancelled.svg'}
					/>
				</section>
				<DataTable columns={columns} data={appointments.documents} />
			</main>
		</div>
	);
};

export default AdminPage;
