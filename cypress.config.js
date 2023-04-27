const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1920,
  viewportWidth: 1080,
  watchForFileChanges: false,
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2',
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
      
    },
  },
});
