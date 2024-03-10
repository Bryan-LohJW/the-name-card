import { NotFoundError } from 'src/errors/errors';
import { Database } from 'src/db/Database';
import { Profile, User } from 'src/entity';

export class ProfileRepository {
	private database: Database;

	constructor() {
		this.database = new Database();
	}

	async getProfile(userId: number): Promise<Profile | null> {
		const dataSource = await this.database.getDataSource();
		const profile = await dataSource
			.getRepository(Profile)
			.findOneBy({ userId });
		return profile;
	}

	async getProfileByUserEmail(email: string): Promise<Profile | null> {
		const dataSource = await this.database.getDataSource();
		const user = await dataSource.getRepository(User).findOneBy({ email });
		if (!user) throw new NotFoundError('User not found');
		const profile = await user.profile;
		return profile;
	}

	async isExist(userId: number): Promise<boolean> {
		const dataSource = await this.database.getDataSource();
		const user = await dataSource
			.getRepository(Profile)
			.existsBy({ userId });
		return user;
	}

	async isExistByUserEmail(email: string): Promise<boolean> {
		const dataSource = await this.database.getDataSource();
		const user = await dataSource.getRepository(User).findOneBy({ email });
		if (!user) throw new NotFoundError('User not found');
		const profile = await user.profile;
		return !!profile;
	}

	async saveProfile(profile: Profile): Promise<Profile> {
		const dataSource = await this.database.getDataSource();
		const savedProfile = await dataSource
			.getRepository(Profile)
			.save(profile);
		return savedProfile;
	}
}
