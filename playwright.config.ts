import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  outputDir: "./tmp_rovodev_test_results",
  reporter: "list",
  fullyParallel: false,
  use: { baseURL: process.env.E2E_BASE_URL ?? "http://127.0.0.1:3107", trace: "off" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 } } },
  ],
  webServer: process.env.E2E_BASE_URL ? undefined : { command: "pnpm dev --hostname 127.0.0.1 --port 3107", url: "http://127.0.0.1:3107", reuseExistingServer: false, timeout: 120000 },
});
