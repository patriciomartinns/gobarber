import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
	beforeEach(() => {
		fakeAppointmentRepository = new FakeAppointmentsRepository();
		fakeCacheProvider = new FakeCacheProvider();
		listProviderAppointments = new ListProviderAppointmentsService(
			fakeAppointmentRepository,
			fakeCacheProvider,
		);
	});

	it('should be able to list the appointments on a specific day', async () => {
		const appointments1 = await fakeAppointmentRepository.create({
			provider_id: 'provider',
			user_id: '123123',
			date: new Date(2020, 4, 20, 14, 0, 0),
		});

		const appointments2 = await fakeAppointmentRepository.create({
			provider_id: 'provider',
			user_id: '123123',
			date: new Date(2020, 4, 20, 15, 0, 0),
		});

		const appointments = await listProviderAppointments.execute({
			provider_id: 'provider',
			year: 2020,
			month: 5,
			day: 20,
		});

		await expect(appointments).toEqual([appointments1, appointments2]);
	});
});
