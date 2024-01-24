import { Database, Repository } from "../modules/database";
import { RevocatedTokens } from '../models/revocatedToken';
const bcrypt = require('bcryptjs');

export class RevocationTokens {
	database: Database;
	revocationTokensRepository: Repository<RevocatedTokens>;

	async load() {
        this.database = await new Database().load();
		this.revocationTokensRepository = this.database.getRepository(RevocatedTokens) as Repository<RevocatedTokens>;
		return this;
	}

	async revokeToken(token: string) {
		const revocated = this.revocationTokensRepository.build({ token: token, created_at: new Date() } as RevocatedTokens);
		await revocated.save();
	}

	async findToken(token: string) {
		return await this.revocationTokensRepository.findByPk(token).catch((err) => null);
	}
}
