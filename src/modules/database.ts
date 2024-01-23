import { User } from '../models/user';
import { Sequelize, Repository } from 'sequelize-typescript';

export { Repository };
export class Database {
	connection: Sequelize;
	db: string;
	user: string;
	password: string;
	host: string;
	port: number;
	constructor() {
		this.db = process.env.DB_NAME ?? '';
		this.user = process.env.DB_USER ?? '';
		this.password = process.env.DB_PASSWORD ?? '';
		this.host = process.env.DB_HOST ?? '';
		this.port = parseInt(process.env.DB_PORT || '0');
	}

	async load() {
        this.connection = new Sequelize({
			database: this.db,
			dialect: 'postgres',
			username: this.user,
			password: this.password,
			host: this.host,
			port: this.port,
			storage: ':memory:',
			logging: true,  //debug
			repositoryMode: true
		});
		this.connection.addModels([User]);
		this.syncModels()
		return this;
	}

	async syncModels(force: boolean = false) {
		const options = { force };
		await this.connection.sync(options);
	}

	getRepository(model: any) {
		return this.connection.getRepository(model);
	}
}