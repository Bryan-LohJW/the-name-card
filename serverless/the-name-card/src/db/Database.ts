import { DataSource, DataSourceOptions } from 'typeorm';

const DATABASE_URL = process.env.DATABASE_URL;

export class Database {
	private dataSource: DataSource;

	constructor() {
		console.log(DATABASE_URL);
		const dataSourceOptions: DataSourceOptions = {
			type: 'postgres',
			url: DATABASE_URL,
			entities: ['src/entity/*.*'],
			synchronize: true,
		};
		this.dataSource = new DataSource(dataSourceOptions);
	}

	public async getDataSource(): Promise<DataSource> {
		if (this.dataSource.isInitialized) {
			console.log('DataSource was initialized');
			return this.dataSource;
		} else {
			console.log('Initializing DataSource');
			const dataSource = await this.dataSource.initialize();
			console.log('Initialized DataSource');
			return dataSource;
		}
	}
}
