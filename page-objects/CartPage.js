const { BasePage } = require("./BasePage");
const testData = require("../test-data/userData");

class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.locators = {
      cartItems: { css: ".cart_info tbody tr" },
      checkoutBtn: {
        css: ".check_out",
        xpath: "//a[contains(@class,'check_out')]",
        text: "Proceed To Checkout",
        role: "link",
      },
      removeItemBtn: (productName) => ({
        xpath: `//tr[contains(., "${productName}")]//a[contains(@class,"cart_quantity_delete")]`,
        css: `tr:has-text("${productName}") a.cart_quantity_delete`,
        role: "link",
        text: "Delete",
      }),
    };
  }

  /**
   * Returns array of product names currently in the cart
   */
  async getCartProductNames() {
    const cartItems = await this.page
      .locator(this.locators.cartItems.css)
      .allTextContents();
    // Extract only the product name (first line of each row)
    const productNames = cartItems.map((item) => item.trim().split("\n")[0]);
    console.log("Cart items:", productNames);
    return productNames;
  }

  /**
   * Verify product exists in cart
   */
  async verifyProductInCart(expectedProduct = testData.productName) {
    const cartItems = await this.getCartProductNames();
    const found = cartItems.includes(expectedProduct);

    console.log(
      `Checking if product is in cart: ${expectedProduct} -> ${found}`
    );
    return found;
  }

  /**
   * Verify multiple products exist in cart
   */
  async verifyMultipleProducts(expectedProducts = testData.productNames) {
    const cartItems = await this.getCartProductNames();

    const allFound = expectedProducts.every((product) =>
      cartItems.includes(product)
    );
    console.log(`Checking if all products are in cart: ${allFound}`);
    return allFound;
  }

  /**
   * Remove product from cart
   */
  async removeProduct(productName = testData.productToRemove) {
    const btn = this.locators.removeItemBtn(productName);

    // Wait until remove button is visible
    await this.page.locator(btn.xpath || btn.css).waitFor({ state: "visible" });

    // Click remove button
    await this.click(btn, `Remove ${productName} from cart`);

    // Wait until the row is gone
    await this.page
      .locator(`tr:has-text("${productName}")`)
      .waitFor({ state: "detached", timeout: 5000 });

    console.log(`Removed product from cart: ${productName}`);
  }

  async clearCart() {
    const removeButtons = this.page.locator("a.cart_quantity_delete");
    const count = await removeButtons.count();

    for (let i = 0; i < count; i++) {
      // always click the first button since DOM updates after each removal
      await removeButtons.first().click();
      await this.page.waitForTimeout(500); // wait for cart to update
    }
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.click(this.locators.checkoutBtn, "Proceed To Checkout");
    await this.waitForUrl(/.*checkout/);
  }
}

module.exports = { CartPage };
