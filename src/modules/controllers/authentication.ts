import { Authentication } from "../../services/authentication";
import { Input, Methods, Rest } from "../../plugins/Rest";

export class AuthenticationControllers {
  rest: Rest;
  constructor(rest: Rest) {
    this.rest = rest;
  }

  async load() {
    this.logIn();
    this.signUp();
    this.logOut();
  }

  async logIn() {
    this.rest.publicRouteBuilder(
      Methods.post,
      "/login",
      async (data: Input) => await new Authentication().logIn(data)
    );
  }

  async signUp() {
    this.rest.publicRouteBuilder(
      Methods.post,
      "/signup",
      async (data: Input) => await new Authentication().signUp(data)
    );
  }

  async logOut() {
    this.rest.publicRouteBuilder(
      Methods.post,
      "/logout",
      async (data: Input) => await new Authentication().logOut(data)
    );
  }
}
