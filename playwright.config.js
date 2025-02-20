import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: [
    ["junit", { outputFile: "results/junit-results.xml" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  projects: [
    {
      timeout: 30 * 1000,
      expect: {
        timeout: 5000,
      },
      use: {
        trace: "on-first-retry",
        baseURL: process.env.BASE_URL,
        browserName: "chromium",
        headless: true,
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 1000 },
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
      testMatch: ["**/*.test.js", "**/*.spec.js"],
    },
  ],
});
