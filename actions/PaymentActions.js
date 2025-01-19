
import { test, expect } from "@playwright/test";
import FormPage from "../pages/FormPage";
import LoginPage from "../pages/LoginPage";

export default class PaymentAction {
  constructor(page) {
    this.page = page;
    this.formPage = new FormPage(page);
    this.loginPage = new LoginPage(page);
  }

  async completePayment(userData) {
    await this.loginPage.login();
    await this.formPage.submitForm(
      userData.fname,
      userData.lname,
      userData.email,

      userData.phone
    );
  }

  async chosePaymentPlan(paymentType) {
    const paymentLocator = this.page.locator(
      `[class="payment-type"]:has-text('${paymentType}')`
    );
    await paymentLocator.click();
  }

  async verifyConfirmation() {
    await this.page.waitForLoadState("networkidle"); // Wait for network activity to settle
    const confirmationMessage = await this.page
      .getByText("Payments confirmation")
      .innerText();

    // Assert that the confirmation message is displayed correctly
    expect(confirmationMessage).toEqual("Payments confirmation ");
  }

   async verifyPricing(page) {
     const priceLocators = {
       productPrice:
         '[class="panel-content-payment"] div:nth-of-type(1) span:nth-child(2)',
       upfrontDiscount:
         '[class="panel-content-payment"] div:nth-of-type(2) span:nth-child(2)',
       subTotal:
         '[class="panel-content-payment"] div:nth-of-type(3) span:nth-child(2)',
       processingFee:
         '[class="panel-content-payment"] div:nth-of-type(4) span:nth-child(2)',
       total:
         '[class="panel-content-payment"] div:nth-of-type(5) span:nth-child(2)',
     };
       const expectedPrices = ["$500", "- $100", "$400", "$12", "$412"];

       for (const [key, selector] of Object.entries(priceLocators)) {
         await expect(page.locator(selector)).toHaveText(expectedPrices.shift());
       }
   }
}