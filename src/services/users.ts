import { Database, Repository } from "../modules/database";
import { User } from "../models/user";
import { Op } from "sequelize";
import { Errors } from "../plugins/Classes/errors";
const bcrypt = require("bcryptjs");

export class Users {
  database: Database;
  userRepository: Repository<User>;

  async load() {
    this.database = await new Database().load();
    this.userRepository = this.database.getRepository(User) as Repository<User>;
    return this;
  }

  async createUser(email: string, password: string) {
    await this.checkDuplicateEmail(email);
    this.validatePassword(password);
    const hash = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALTS ?? "")
    );
    const user = this.userRepository.build({ email, password: hash } as User);
    await user.save();
    return user;
  }

  async getUserFromEmailOrNull(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: { [Op.iLike]: email } },
    });
    return user;
  }

  validatePassword(password: string) {
    const expression = new RegExp(
      /^(?=.*[0-9])(?=.*[A-z])(?=.*[^A-z0-9]).{6,}$/
    );
    if (!expression.test(password)) {
      throw Errors.PasswordNotStrongEnough;
    }
  }

  async checkPassword(passwordA: string, passwordB: string) {
    const match = await bcrypt.compare(passwordA, passwordB);
    if (!match) {
      throw Errors.IncorrectInformation;
    }
    return true;
  }

  async checkDuplicateEmail(email: string) {
    const existingUser = await this.getUserFromEmailOrNull(email);
    if (existingUser) {
        throw Errors.IncorrectInformation;
    }
  }
}
