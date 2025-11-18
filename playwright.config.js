// @ts-check
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.test.js"],
  timeout: 60000,
  fullyParallel: false,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    actionTimeout: 60000,
    navigationTimeout: 60000,
    trace: "on-first-retry",
  },
});
