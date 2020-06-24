import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUserRepository();
		fakeHashProvider = new FakeHashProvider();

		createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
		authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
	});

	it('should be able to authenticate', async () => {
		const user = await createUser.execute({
			name: 'Patricio',
			email: 'eupatriciomartins@gmail.com',
			password: '123123',
		});

		const response = await authenticateUser.execute({
			email: 'eupatriciomartins@gmail.com',
			password: '123123',
		});

		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});

	it('should not be able to authenticate with non existing user', async () => {
		await expect(
			authenticateUser.execute({
				email: 'eupatriciomartins@gmail.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with wrong password', async () => {
		await createUser.execute({
			name: 'Patricio',
			email: 'eupatriciomartins@gmail.com',
			password: '123123',
		});

		await expect(
			authenticateUser.execute({
				email: 'eupatriciomartins@gmail.com',
				password: 'wrong-password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
