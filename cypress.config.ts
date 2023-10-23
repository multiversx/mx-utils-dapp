import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 15000,
    responseTimeout: 15000,
    requestTimeout: 15000,
    chromeWebSecurity: false,
    baseUrl: 'https://localhost:3001/',
    screenshotOnRunFailure: false,
    video: false,
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
