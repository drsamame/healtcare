
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import { useEffect } from 'react';

const RequestSuccess = async ({
	searchParams,
	params: { userId },
}: SearchParamProps) => {
	const appointmentId = (searchParams?.appointmentId as string) || '';
	const appointment = await getAppointment(appointmentId);

	const doctor = Doctors.find(
		(doctor) => {
      return doctor.name === appointment.primaryPhysician}
	);



	return (
		<div className=" flex h-screen max-h-screen px-[5%]">
     
			<div className="success-img">
      {JSON.stringify(appointment)}
				<Link href="/">
					<Image
						src="/assets/icons/logo-full.svg"
						height={1000}
						width={1000}
						alt="logo"
						className="h-10 w-fit"
					/>
				</Link>

				<section className="flex flex-col items-center">
					<Image
						src="/assets/gifs/success.gif"
						height={300}
						width={280}
						alt="success"
					/>
					<h2 className="header mb-6 max-w-[600px] text-center">
						Tu <span className="text-green-500">solicitus de cita</span> ha sido
						enviada con éxito
					</h2>
					<p>Nos pondremos en contacto pronto para confirmar la cita.</p>
				</section>

				<section className="request-details">
					<p>Detalles de la solicitud: </p>
					<div className="flex items-center gap-3">
						<Image
							src='/assets/images/dr-sharma.png'
							alt="doctor"
							width={100}
							height={100}
							className="size-6"
						/>
						<p className="whitespace-nowrap">Dr. {doctor?.name}</p>
					</div>
					<div className="flex gap-2">
						<Image
							src="/assets/icons/calendar.svg"
							height={24}
							width={24}
							alt="calendar"
						/>
						<p> {formatDateTime(appointment.schedule).dateTime}</p>
					</div>
				</section>

				<Button variant="outline" className="shad-primary-btn" asChild>
					<Link href={`/patients/${userId}/new-appointment`}>Nueva cita</Link>
				</Button>

				<p className="copyright">© 2024 CarePluse</p>
			</div>
		</div>
	);
};

export default RequestSuccess;
