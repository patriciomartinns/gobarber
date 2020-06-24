import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUserRepository();
		fakeHashProvider = new FakeHashProvider();
		createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});
	it('should be able to create a new user', async () => {
		const user = await createUser.execute({
			name: 'Patricio',
			email: 'eupatriciomartins@gmail.com',
			password: '123456',
		});

		expect(user).toHaveProperty('id');
	});

	it('should be able to create a new user', async () => {
		await createUser.execute({
			name: 'Patricio',
			email: 'eupatriciomartins@gmail.com',
			password: '123456',
		});

		await expect(
			createUser.execute({
				name: 'Patricio',
				email: 'eupatriciomartins@gmail.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
