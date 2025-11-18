// @ts-check
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["**/*.test.js"],
  timeout: 30000,
  fullyParallel: false,
  use: {
    baseURL: process.env.NEXT_PUBLIC_PB_URL || "http://localhost:3000",
    headless: true,
    trace: "on-first-retry",
  },
});
