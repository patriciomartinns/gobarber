import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository();

		showProfile = new ShowProfileService(fakeUsersRepository);
	});

	it('should be able to show the profile', async () => {
		const { id } = await fakeUsersRepository.create({
			name: 'Patricio Martins',
			email: 'eupatriciomartins@gmail.com',
			password: '123123',
		});

		const profile = await showProfile.execute({
			user_id: id,
		});

		expect(profile.name).toBe('Patricio Martins');
		expect(profile.email).toBe('eupatriciomartins@gmail.com');
	});

	it('should be able to show the profile from non-existing user', async () => {
		expect(
			showProfile.execute({
				user_id: 'non-existing-user-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
