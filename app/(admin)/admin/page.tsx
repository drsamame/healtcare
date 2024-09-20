import { StatCard } from '@/components/StatCard';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import { columnsAppoiment } from '@/components/table/columnsAppoiment';
import { DataTable } from '@/components/table/Datatable';
import DownloadReportButton from '@/components/DownloadReportButton';
import type { IReportData } from '@/components/DownloadReportButton';
const AdminPage = async () => {
	const { data } = await getRecentAppointmentList();
	return (
		<>
			<section className="w-full space-y-4">
				<p className="text-dark-700">
					Empieza el día administrando las nuevas citas
				</p>
			</section>
			<DownloadReportButton dataTable={data?.appointments as IReportData[]} />
			{data && (
				<>
					<section className="admin-stat">
						<StatCard
							type="appointments"
							count={data.scheduledCount}
							label="Citas Agendadas"
							icon={'/assets/icons/appointments.svg'}
						/>
						<StatCard
							type="pending"
							count={data.pendingCount}
							label="Citas Pendientes"
							icon={'/assets/icons/pending.svg'}
						/>
						<StatCard
							type="cancelled"
							count={data.cancelledCount}
							label="Citas Canceladas"
							icon={'/assets/icons/cancelled.svg'}
						/>
					</section>
					<DataTable columns={columnsAppoiment} data={data.appointments} />
				</>
			)}
		</>
	);
};

export default AdminPage;
