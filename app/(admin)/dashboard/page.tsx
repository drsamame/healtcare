import { auth } from '@/auth';
import SubmitButton from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const DashboardPage = async () => {
	const session = await auth();
	return (
		<>
			<section className="w-full space-y-4">
				<h1 className="header">Bienvenido 👋</h1>

				<p className="text-dark-700">
					Empieza el día administrando las nuevas citas
				</p>
			</section>

			<section className="admin-stat">
				<Button variant="outline" className="shad-primary-btn" asChild>
					<Link href={`/patients/${session?.user.id}/register`}>
						Crear cita
					</Link>
				</Button>
			</section>
		</>
	);
};

export default DashboardPage;
