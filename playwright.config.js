// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  expect: {
    timeout: 45000,
  },

  reporter: [["line"], ["html", { open: "never" }], ["allure-playwright"]],

  use: {
    headless: false, // headless for CI/CD
    // storageState: "tests/setup/auth.json",
    screenshot: "only-on-failure",
    video: "on",
    trace: "on",
  },

  workers: 1,

  projects: [
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
