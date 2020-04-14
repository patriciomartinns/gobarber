import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointments';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
	provider: string;
	date: Date;
}

class CreateAppointmentService {
	private appointmentsRepository: AppointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	}

	public execute({ provider, date }: Request): Appointment {
		const appointmentDate = startOfHour(date);

		const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentInSameDate) {
			throw Error('This appointment is aleady booked');
		}

		const appointment = this.appointmentsRepository.create({
			provider,
			date: appointmentDate,
		});

		return appointment;
	}
}

export default CreateAppointmentService;
