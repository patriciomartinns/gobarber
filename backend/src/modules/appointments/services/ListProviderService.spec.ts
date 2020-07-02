import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let lisProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();
		fakeCacheProvider = new FakeCacheProvider();

		lisProviders = new ListProvidersService(
			fakeUsersRepository,
			fakeCacheProvider,
		);
	});

	it('should be able to list the providers', async () => {
		const user1 = await fakeUsersRepository.create({
			name: 'Patricio 1',
			email: 'patricio1@email.com',
			password: '123123',
		});

		const user2 = await fakeUsersRepository.create({
			name: 'Patricio 2',
			email: 'patricio2@email.com',
			password: '123123',
		});

		const loggedUser = await fakeUsersRepository.create({
			name: 'Patricio 5',
			email: 'patricio5@email.com',
			password: '123123',
		});

		const providers = await lisProviders.execute({
			user_id: loggedUser.id,
		});

		expect(providers).toEqual([user1, user2]);
	});
});
