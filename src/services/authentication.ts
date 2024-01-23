import { Input } from "plugins/Rest";

export class Authentication {
  name: string;

  async logIn(input: Input) {
    const { email = "", password = "" } = input.data;
    //TODO Continue auth logic
    console.log(email);
    console.log(password);
    return {
      accessToken: "fake access token",
      refreshToken: "fake refresh token",
      userId: "fake id",
    };
  }
}