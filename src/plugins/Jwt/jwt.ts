import * as jwt from "jsonwebtoken";
import { Errors } from "../../plugins/Classes/errors";
import { UserDetails } from "../../plugins/Classes/userDetails";

export class Jwt {
  signSessionToken(userDetails: UserDetails) {
    try {
      const { userId } = userDetails;
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //1d
          type: "session",
          data: { userId },
        },
        process.env.JWT_SECRET ?? ""
      );
      return token;
    } catch (err: any) {
      console.log(new Date().getTime());
      console.log(err);
      throw {
        message: err?.message ?? Errors.AuthorizationProcessFailed.message,
      };
    }
  }

  signAccessToken(userDetails: UserDetails) {
    try {
      const { userId } = userDetails;
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2, //2h
          type: "access",
          data: { userId },
        },
        process.env.JWT_SECRET ?? ""
      );
      return token;
    } catch (err: any) {
      console.log(new Date().getTime());
      console.log(err);
      throw {
        message: err?.message ?? Errors.AuthorizationProcessFailed.message,
      };
      // throw Errors.AuthorizationProcessFailed;
    }
  }

  verify(token: string) {
    try {
      const valid_token = jwt.verify(token, process.env.JWT_SECRET ?? "");
      return valid_token;
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        throw Errors.TokenExpired;
      }
      throw Errors.TokenInvalid;
    }
  }
}
