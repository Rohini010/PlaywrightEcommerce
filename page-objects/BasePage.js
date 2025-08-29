// page-objects/BasePage.js
const AIWrapper = require("../utils/AIWrapper");
class BasePage {
  constructor(page) {
    this.page = page;
    this.ai = new AIWrapper(page);
  }

  getLocator(locatorInfo, elementName = "element") {
    return this.ai.findWorkingLocator(locatorInfo, elementName);
  }

  async click(locatorInfo, elementName = "element") {
    const locator = await this.ai.findWorkingLocator(locatorInfo, elementName);
    console.log(`Click action performed on "${elementName}"`);
    await locator.click();
  }

  async fill(locatorInfo, value, elementName = "input field") {
    const locator = await this.ai.findWorkingLocator(locatorInfo, elementName);
    console.log(`Filled "${elementName}" with "${value}"`);
    await locator.fill(value);
  }

  async getText(locatorInfo, elementName = "element") {
    const locator = await this.ai.findWorkingLocator(locatorInfo, elementName);
    const text = await locator.textContent();
    console.log(`Got text from "${elementName}": "${text}"`);
    return text;
  }

  async waitForUrl(urlPattern, timeout = 5000) {
    await this.page.waitForURL(urlPattern, { timeout });
  }
  async navigate(url) {
    await this.page.goto(url);
  }
  async waitForVisible(locatorInfo, elementName = "element", timeout = 5000) {
    const locator = await this.ai.findWorkingLocator(locatorInfo, elementName);
    await locator.waitFor({ state: "visible", timeout });
    return locator;
  }
}

module.exports = { BasePage };
