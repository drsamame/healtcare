import Image from 'next/image';
import Link from 'next/link';

import { StatCard } from '@/components/StatCard';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import { columns, Payment } from '@/components/table/columns';
import { DataTable } from '@/components/table/Datatable';

async function getData(): Promise<Payment[]> {
	// Fetch data from your API here.
	return [
		{
			id: '728ed52f',
			amount: 100,
			status: 'pending',
			email: 'm@example.com',
		},
		// ...
	];
}
const AdminPage = async () => {
	const appointments = await getRecentAppointmentList();
	console.log(appointments)
	const data = await getData();
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
				<DataTable columns={columns} data={data} />
			</main>
		</div>
	);
};

export default AdminPage;
