const { AIWrapper } = require("../utils/AIWrapper");

class BasePage {
  constructor(page) {
    this.page = page;
    this.ai = new AIWrapper(page);
  }

  async click(locatorInfo, elementName = "element") {
    await this.ai.smartClick(locatorInfo, elementName);
  }

  async fill(locatorInfo, value, elementName = "input field") {
    await this.ai.smartFill(locatorInfo, value, elementName);
  }

  async getText(locatorInfo, elementName = "element") {
    return await this.ai.smartTextContent(locatorInfo, elementName);
  }

  async waitForUrl(regex) {
    await this.page.waitForURL(regex, { timeout: 10000 });
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async waitForVisible(locatorInfo) {
    const locator = this.getLocator(locatorInfo);
    await locator.first().waitFor({ state: "visible" });
  }

  /**
   * Centralized locator resolver
   */
  getLocator(locatorInfo) {
    if (locatorInfo.css) return this.page.locator(locatorInfo.css);
    if (locatorInfo.xpath)
      return this.page.locator(`xpath=${locatorInfo.xpath}`);
    if (locatorInfo.placeholder)
      return this.page.getByPlaceholder(locatorInfo.placeholder);
    if (locatorInfo.text)
      return this.page.getByText(locatorInfo.text, { exact: false });
    if (locatorInfo.role && locatorInfo.text) {
      return this.page.getByRole(locatorInfo.role, { name: locatorInfo.text });
    }
    throw new Error(`Invalid locator: ${JSON.stringify(locatorInfo)}`);
  }

  async waitForVisible(locatorInfo, timeout = 5000) {
    const locator = this.getLocator(locatorInfo);
    await locator.first().waitFor({ state: "visible", timeout });
  }
  async waitForInvisible(locatorInfo, timeout = 5000) {
    const locator = this.getLocator(locatorInfo);
    await locator.first().waitFor({ state: "hidden", timeout });
  }
}

module.exports = { BasePage };
