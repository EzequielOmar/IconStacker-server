import { Rest } from "../../plugins/Rest";
import { AuthenticationControllers } from "./authentication";

export class Controllers {
	rest: Rest;
	constructor() {
        this.rest = new Rest();
	}

	async load() {
		await this.rest.load();
		await this.loadRoutes();
	}

	async loadRoutes() {
		await new AuthenticationControllers(this.rest).load();
	}
}