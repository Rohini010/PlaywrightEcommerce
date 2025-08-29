const { test } = require("../fixtures/testWithAuth");
const { expect } = require("@playwright/test");
const { clearCart } = require("../utils/clearCart");
const { ProductsPage } = require("../page-objects/ProductsPage");
const { CartPage } = require("../page-objects/CartPage");
const { CheckoutPage } = require("../page-objects/CheckoutPage");
const testData = require("../test-data/userData");

test.describe("Checkout Flow", () => {
  let productsPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await clearCart(page);
  });

  test("Checkout and place order", async ({ page }) => {
    await productsPage.openProductsPage();
    await productsPage.addProductToCart(testData.productName);
    await productsPage.navigateToCart();
    await cartPage.verifyProductInCart(testData.productName);
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyProductsInCheckout([testData.productName]);
    await checkoutPage.enterOrderMessage("Automating checkout flow");
    await checkoutPage.placeOrder();
    await checkoutPage.fillPaymentDetails(testData.payment);
    await checkoutPage.confirmOrder();
    await checkoutPage.logoutAfterOrder();
  });
});
