import { defineConfig } from '@playwright/test';

// Con BASE_URL (Preview o producción de Vercel) se prueba contra esa URL, sin servidor local
// y sin interceptar el CDN. Sin ella, se levanta tests/servidor.mjs.
const BASE_URL = process.env.BASE_URL;

export default defineConfig({
  testDir: './e2e',
  outputDir: './test-results',
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL || 'http://localhost:4173/',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'movil', use: { browserName: 'chromium', viewport: { width: 360, height: 740 }, hasTouch: true } },
    { name: 'tableta', use: { browserName: 'chromium', viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'escritorio', use: { browserName: 'chromium', viewport: { width: 1440, height: 900 } } },
  ],
  webServer: BASE_URL ? undefined : {
    command: 'node servidor.mjs',
    url: 'http://localhost:4173/__salud',
    reuseExistingServer: !process.env.CI,
    timeout: 10_000,
  },
});
