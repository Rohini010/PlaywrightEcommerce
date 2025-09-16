const { test: base } = require("@playwright/test");
const { ensureAuth } = require("../utils/SessionManager");

const test = base.extend({
  storageState: async ({}, use) => {
    // ensures auth.json exists and is valid
    const storageStatePath = await ensureAuth();
    await use(storageStatePath);
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await page.goto("https://automationexercise.com/");

    if (!(await page.$('a[href="/logout"]'))) {
      console.log(" Session not valid, refreshing login...");
      const { doLogin, authFile } = require("../utils/SessionManager");
      await doLogin();

      const freshContext = await context.browser().newContext({
        storageState: authFile,
      });
      const freshPage = await freshContext.newPage();
      await freshPage.goto("https://automationexercise.com/");
      await use(freshPage);
    } else {
      await use(page);
    }
  },
});

module.exports = { test };
