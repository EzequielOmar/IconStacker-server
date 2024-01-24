import { Jwt } from "../plugins/Jwt/jwt";
import { UserDetails } from "../plugins/Classes/userDetails";
import { Input } from "../plugins/Rest";
import { Errors } from "../plugins/Classes/errors";
import { Users } from "./users";
import { RevocationTokens } from "./revocationTokens";

export class Authentication {
  name: string;

  async logIn(input: Input) {
    const { email = "", password = "" } = input.data;
    const users = await new Users().load();
    const user = await users.getUserFromEmailOrNull(email);
    if (user && (await users.checkPassword(password, user?.password))) {
      //if (!user.is_verified) {
      //}
      return this.sessionTokens({ userId: user.id } as UserDetails);
    }
    throw Errors.IncorrectInformation;
  }

  async signUp(input: Input) {
    const { email, password } = input.data;
    if (!email || !password) {
      throw Errors.MissingObligatoryParameter;
    }
    const users = await new Users().load();
    const user = await users.createUser(email, password);
    //* For know, returning session tokens
    return this.sessionTokens({ userId: user.id } as UserDetails);
  }

  async logOut(input: Input) {
    const { refreshToken, accessToken } = input.data;
    await this.blackListToken(refreshToken);
    await this.blackListToken(accessToken);
    return "Session Closed";
  }

  async blackListToken(token: string) {
    const revocationTokens = await new RevocationTokens().load();
    const is_revoked = await revocationTokens.findToken(token);
    if (!is_revoked) {
      await revocationTokens.revokeToken(token);
    }
  }

  async sessionTokens(userDetails: UserDetails) {
    const accessToken = await this.signAccessToken(userDetails);
    const refreshToken = await this.signRefreshToken(userDetails);
    return { accessToken, refreshToken };
  }

  async signAccessToken(userDetails: UserDetails) {
    return new Jwt().signAccessToken(userDetails);
  }

  async signRefreshToken(userDetails: UserDetails) {
    return new Jwt().signSessionToken(userDetails);
  }

  async checkToken(token: string) {
    const valid_token: any = new Jwt().verify(token);
    const revocationTokens = await new RevocationTokens().load();
    const is_revoked = await revocationTokens.findToken(token);
    if (is_revoked) {
      throw Errors.TokenRevoked;
    }
    return valid_token;
  }
}
