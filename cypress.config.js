// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'cwvpba',
  e2e: {
    experimentalStudio: true,
    chromeWebSecurity: false,
    // baseUrl: 'https://www.paylocity.com',
  },
});
