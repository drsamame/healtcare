import AppointmentForm from '@/components/forms/AppointmentForm';
import Image from 'next/image';
import { getPatient } from '@/lib/actions/patient.actions';

export default async function NewAppointment({
	params: { userId },
}: SearchParamProps) {
	const patient = await getPatient(userId);
	console.log(patient)
	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[860px] flex-1 justify-between">
					<Image
						alt="patient"
						src="/assets/icons/logo-full.svg"
						height={1000}
						width={1000}
						className="mb-12 h-10 w-fit"
					></Image>
					<AppointmentForm
						type="create"
						userId={userId}
						patientId={patient?.$id}
					/>
					<p className="copyright mt-10 py-12">© 2024 CarePulse </p>
				</div>
			</section>

			<Image
				src="/assets/images/appointment-img.png"
				width={1000}
				height={1000}
				alt="appointment"
				className="side-image max-w-[390px] bg-bottom"
			/>
		</div>
	);
}
