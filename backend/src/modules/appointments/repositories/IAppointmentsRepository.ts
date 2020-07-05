import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
	create(data: ICreateAppointmentDTO): Promise<Appointment>;
	findByDate(
		date: Date,
		provider_id: string,
	): Promise<Appointment | undefined>;
	findAllInMonthFromProvider(
		data: IFindAllInMonthFromProviderDTO,
	): Promise<Appointment[]>;
	findAllInDayFromProvider(
		data: IFindAllInDayFromProviderDTO,
	): Promise<Appointment[]>;
}
