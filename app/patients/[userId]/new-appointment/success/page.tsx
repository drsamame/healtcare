import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import { useEffect } from 'react';
import { Services } from '@/constants';

const RequestSuccess = async ({
	params: { userId: appointmentId },
}: SearchParamProps) => {
	const { data: appointment } = await getAppointment(appointmentId);
	const service = Services.find((service) => {
		return appointment && service.name === appointment.specialty;
	});

	return (
		<div className=" flex h-screen max-h-screen px-[5%]">
			<div className="success-img">
				<Link href="/">
					<Image
						src="/assets/icons/logo-full2.svg"
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
						Tu <span className="text-green-500">solicitud de cita</span> ha sido
						enviada con éxito
					</h2>
					<p>Nos pondremos en contacto pronto para confirmar la cita.</p>
				</section>

				<section className="request-details">
					<p>Detalles de la solicitud: </p>
					<div className="flex items-center gap-3">
						<Image
							src={service?.image!}
							alt="doctor"
							width={100}
							height={100}
							className="size-6"
						/>
						<p className="whitespace-nowrap">{service?.name}</p>
					</div>
					<div className="flex gap-2">
						<Image
							src="/assets/icons/calendar.svg"
							height={24}
							width={24}
							alt="calendar"
						/>
						<p> {appointment?.schedule ? formatDateTime(appointment.schedule).dateOnly : ''}</p>
					</div>
				</section>

				<Button variant="outline" className="shad-primary-btn" asChild>
					{/* <Link href={`/patients/${userId}/new-appointment`}>Nueva cita</Link> */}
				</Button>

				<p className="copyright">© 2024 CarePluse</p>
			</div>
		</div>
	);
};

export default RequestSuccess;
