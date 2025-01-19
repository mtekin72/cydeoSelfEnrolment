import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  reporter: "html",
  projects: [
    {
      timeout: 60 * 1000,
      expect: {
        timeout: 10000,
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
