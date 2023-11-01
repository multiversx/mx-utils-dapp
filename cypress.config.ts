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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
