import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
	beforeEach(() => {
		fakeAppointmentRepository = new FakeAppointmentsRepository();
		listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
			fakeAppointmentRepository,
		);
	});

	it('should be able to list the month availability from provider', async () => {
		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 20, 8, 0, 0),
		});

		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 20, 9, 0, 0),
		});

		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 20, 10, 0, 0),
		});

		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 20, 11, 0, 0),
		});

		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 20, 12, 0, 0),
		});

		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 20, 13, 0, 0),
		});

		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 20, 14, 0, 0),
		});

		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 20, 15, 0, 0),
		});

		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 20, 16, 0, 0),
		});

		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 20, 17, 0, 0),
		});

		await fakeAppointmentRepository.create({
			provider_id: 'user',
			user_id: '123132',
			date: new Date(2020, 4, 21, 8, 0, 0),
		});

		const availability = await listProviderMonthAvailability.execute({
			provider_id: 'user',
			year: 2020,
			month: 7,
		});

		await expect(availability).toEqual(
			expect.arrayContaining([
				{ day: 2, available: false },
				{ day: 3, available: false },
				{ day: 4, available: false },
				{ day: 5, available: true },
				{ day: 6, available: true },
			]),
		);
	});
});
