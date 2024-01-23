import { Authentication } from "../../services/Authentication";
import { Input, Methods, Rest } from "../../plugins/Rest";

export class AuthenticationControllers {
  rest: Rest;
  constructor(rest: Rest) {
    this.rest = rest;
  }

  async load() {
    this.logIn();
  }

  async logIn() {
    this.rest.publicRouteBuilder(
      Methods.post,
      "/login",
      async (data: Input) => await new Authentication().logIn(data)
    );
  }
}
