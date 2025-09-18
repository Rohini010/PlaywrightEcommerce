// utils/SessionManager.js
const path = require("path");
const fs = require("fs");
const { chromium } = require("@playwright/test");
const testData = require("../test-data/userData");
const { LoginPage } = require("../page-objects/LoginPage");

const authFile = path.join(__dirname, "../auth.json");

async function doLogin() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await page.fill('input[data-qa="login-email"]', testData.validuser.email);
  await page.fill(
    'input[data-qa="login-password"]',
    testData.validuser.password
  );
  await page.click('button[data-qa="login-button"]');

  await page.waitForSelector('a[href="/logout"]', { timeout: 10000 });

  await context.storageState({ path: authFile });
  await browser.close();

  console.log("auth.json created successfully.");
}

async function ensureAuth() {
  if (!fs.existsSync(authFile)) {
    console.log("auth.json missing. Logging in...");
    await doLogin();
  }
  return authFile;
}

async function clearAuth() {
  if (fs.existsSync(authFile)) {
    fs.unlinkSync(authFile);
    console.log("Removed auth.json.");
  }
}

module.exports = { ensureAuth, clearAuth, authFile, doLogin };
