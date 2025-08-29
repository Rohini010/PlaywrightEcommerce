// utils/AIWrapper.js
const fs = require("fs");
const path = require("path");

class AIWrapper {
  constructor(page) {
    this.page = page;
    this.locatorsFile = path.join(__dirname, "../locators.json");
    this.locatorsCache = this.loadLocators();
  }

  loadLocators() {
    if (fs.existsSync(this.locatorsFile)) {
      return JSON.parse(fs.readFileSync(this.locatorsFile, "utf-8"));
    }
    return {};
  }

  saveLocators() {
    fs.writeFileSync(
      this.locatorsFile,
      JSON.stringify(this.locatorsCache, null, 2),
      "utf-8"
    );
  }

  async findWorkingLocator(locatorInfo, elementName) {
    const strategies = Object.entries(locatorInfo);

    for (const [type, value] of strategies) {
      try {
        let locator;
        switch (type) {
          case "css":
            locator = this.page.locator(value);
            break;
          case "xpath":
            locator = this.page.locator(`xpath=${value}`);
            break;
          case "text":
            locator = this.page.getByText(value, { exact: true });
            break;
          case "role":
            locator = this.page.getByRole(value.role, { name: value.name });
            break;
          default:
            continue;
        }

        await locator.first().waitFor({ state: "visible", timeout: 2000 });
        console.log(
          `[AIWrapper] Using working locator for "${elementName}": ${type} -> ${value}`
        );

        const cached = this.locatorsCache[elementName]?.[type] === value;
        console.log(
          `[AIWrapper] Using ${
            cached ? "CACHED" : "NEW"
          } locator for "${elementName}": ${type} -> ${value}`
        );

        // Update only this locator in cache
        if (!this.locatorsCache[elementName]) {
          this.locatorsCache[elementName] = {};
        }
        this.locatorsCache[elementName] = { [type]: value };
        this.saveLocators();

        return locator.first();
      } catch (err) {
        console.log(`[AIWrapper] ${type} failed for "${elementName}"`);
      }
    }

    throw new Error(`No valid locator found for "${elementName}"`);
  }

  async smartClick(locatorInfo, elementName = "element") {
    const locator = await this.findWorkingLocator(locatorInfo, elementName);
    await locator.click();
  }

  async smartFill(locatorInfo, value, elementName = "input field") {
    const locator = await this.findWorkingLocator(locatorInfo, elementName);
    await locator.fill(value);
  }

  async smartGetText(locatorInfo, elementName = "element") {
    const locator = await this.findWorkingLocator(locatorInfo, elementName);
    return await locator.textContent();
  }
}

module.exports = AIWrapper;
