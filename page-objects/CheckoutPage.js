const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");
const testData = require("../test-data/userData");

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    this.locators = {
      checkoutBtn: {
        css: "a.check_out",
        xpath: "//a[contains(text(),'Proceed To Checkout')]",
        text: "Proceed To Checkout",
        role: "link",
      },
      placeOrderBtn: {
        css: "a.check_out",
        xpath: "//a[contains(text(),'Place Order')]",
        text: "Place Order",
        role: "link",
      },
      orderMsg: {
        css: "#ordermsg textarea",
        xpath: "//textarea[@id='ordermsg']",
      },
      productNames: {
        css: ".table-condensed tbody tr td h4 a",
        xpath: "//table[contains(@class,'table-condensed')]//h4/a",
      },
      nameOnCard: {
        css: "input[name='name_on_card']",
        xpath: "//input[@name='name_on_card']",
      },
      cardNumber: {
        css: "input[name='card_number']",
        xpath: "//input[@name='card_number']",
      },
      cvc: { css: "input[name='cvc']", xpath: "//input[@name='cvc']" },
      expiryMonth: {
        css: "input[name='expiry_month']",
        xpath: "//input[@name='expiry_month']",
      },
      expiryYear: {
        css: "input[name='expiry_year']",
        xpath: "//input[@name='expiry_year']",
      },
      confirmBtn: {
        css: ".col-md-12 button[type='submit']",
        xpath: "//button[contains(text(),'Confirm')]",
        text: "Confirm",
        role: "button",
      },
      logoutLink: {
        css: "a[href*='logout']",
        xpath: "//a[contains(@href,'logout')]",
        text: "Logout",
        role: "link",
      },
      confirmationMessage: {
        css: ".text-center",
        xpath: "//div[@class='text-center']",
      },
    };
  }

  /**
   * Verify product(s) in checkout table
   */
  async verifyProductsInCheckout(
    expectedProducts = [testData.checkoutProductName]
  ) {
    const productNames = await this.page
      .locator(this.locators.productNames.css)
      .allTextContents();
    const trimmed = productNames.map((n) => n.trim());

    for (const product of expectedProducts) {
      expect(trimmed).toContain(product);
      console.log(`Verified product in checkout: ${product}`);
    }
  }

  /**
   * Enter order message
   */
  async enterOrderMessage(message = "Automating exercise") {
    await this.fill(this.locators.orderMsg, message, "Order message");
  }

  /**
   * Click Place Order
   */
  async placeOrder() {
    await this.click(this.locators.placeOrderBtn, "Place Order");
    await this.waitForVisible(this.locators.nameOnCard); // ensure payment form visible
  }

  /**
   * Fill Payment Details
   */
  async fillPaymentDetails(payment = testData.payment) {
    await this.fill(this.locators.nameOnCard, payment.name, "Name on Card");
    await this.fill(this.locators.cardNumber, payment.number, "Card Number");
    await this.fill(this.locators.cvc, payment.cvc, "CVC");
    await this.fill(this.locators.expiryMonth, payment.month, "Expiry Month");
    await this.fill(this.locators.expiryYear, payment.year, "Expiry Year");
    console.log("Payment details entered successfully");
  }

  /**
   * Confirm Order
   */
  async confirmOrder(expectedMessage = testData.messages.orderSuccess) {
    await this.waitForVisible(this.locators.confirmBtn);

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      this.click(this.locators.confirmBtn, "Confirm Order"),
    ]);

    await this.waitForUrl(/.*payment_done/);

    const confirmationMessage = await this.getText(
      this.locators.confirmationMessage,
      "Confirmation message"
    );
    expect(confirmationMessage).toContain(expectedMessage);
    console.log(`Order confirmed with message: "${expectedMessage}"`);
  }

  /**
   * Logout after order
   */
  async logoutAfterOrder() {
    await this.click(this.locators.logoutLink, "Logout");
    await this.waitForUrl(/.*login/);
    console.log("Logged out after order");
  }
}

module.exports = { CheckoutPage };
