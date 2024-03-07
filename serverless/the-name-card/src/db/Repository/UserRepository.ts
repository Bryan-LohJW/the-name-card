import { Database } from 'src/db/Database';
import { User } from 'src/entity';

export class UserRepository {
	private database: Database;

	constructor() {
		this.database = new Database();
	}

	async getUser(id: number): Promise<User | null> {
		const dataSource = await this.database.getDataSource();
		const user = await dataSource.getRepository(User).findOneBy({ id });
		return user;
	}

	async getUserByEmail(email: string): Promise<User | null> {
		const dataSource = await this.database.getDataSource();
		const user = await dataSource.getRepository(User).findOneBy({ email });
		return user;
	}

	async isExist(id: number): Promise<boolean> {
		const dataSource = await this.database.getDataSource();
		const user = await dataSource.getRepository(User).existsBy({ id });
		return user;
	}

	async isExistByEmail(email: string): Promise<boolean> {
		const dataSource = await this.database.getDataSource();
		const isExist = await dataSource
			.getRepository(User)
			.existsBy({ email });
		return isExist;
	}

	async saveUser(user: User): Promise<User> {
		const dataSource = await this.database.getDataSource();
		const savedUser = await dataSource.getRepository(User).save(user);
		return savedUser;
	}

	async upsertUserByEmail(user: User): Promise<User> {
		const dataSource = await this.database.getDataSource();
		await dataSource.getRepository(User).upsert(user, {
			conflictPaths: ['email'],
			skipUpdateIfNoValuesChanged: true,
		});
		return user;
	}
}
