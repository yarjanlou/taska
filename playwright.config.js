// @ts-check
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.test.js"],
  timeout: 30000,
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3000",
    headless: false,
    trace: "on-first-retry",
  },
});
