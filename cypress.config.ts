import { defineConfig } from "cypress";
import coverageTask from "@cypress/code-coverage/task.js";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    },
  },
});
