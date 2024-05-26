import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "eu-west-3",
    };
  },
  stacks(app) {
    app.stack(API);
  }
} satisfies SSTConfig;
