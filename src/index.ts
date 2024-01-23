import { Database } from "./modules/database";
import { Controllers } from "./modules/controllers";

import * as dotenv from "dotenv";

class app {
  name: string;
  constructor() {
    dotenv.config();
  }
  async run() {
    try {
      await new Database().load();
      await new Controllers().load();
    } catch (error) {
      throw error;
    }

    this.captureUnhandled();

    return true;
  }
  captureUnhandled() {
    process.on("uncaughtException", function (error: any) {
      console.log("Caught exception");
      console.log(error?.messsage ?? "No message field");
      console.log(error);

      process.exit(-1);
    });
  }
}

new app().run();
