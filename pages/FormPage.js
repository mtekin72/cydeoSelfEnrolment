import { test, expect } from "@playwright/test";
import BasePage from "./BasePage";
export default class FormPage extends BasePage {
  async submitForm(fname, lname, email, phone) {
    await this.page.locator("#mat-input-0").fill(fname);
    await this.page.locator("#mat-input-1").fill(lname);
    await this.page.locator("#mat-input-2").fill(email);
    await this.page.locator("#mat-input-3").fill(phone);
    const dropdownItem = await this.page.getByText(
      "How did you hear about us?"
    );
    await dropdownItem.click();
    await this.page.getByText("Google").click();
    await this.page.locator("[type='submit']").click();
  }
  async verifySteps() {
    const stepTitles = await this.page.locator(".step-title").allTextContents();
    expect(stepTitles).toEqual(["Start Application", "Payment plan", "Review"]);
  }
  async verifyPaymentSteps(step1, step2, step3) {
    const stepElements = await this.page.locator(".step").all();
    console.log("Step elements:", stepElements); // Debugging: log the step elements
    const stepClasses = await Promise.all(
      stepElements.map((el) => el.getAttribute("class"))
    );
    console.log("Step classes:", stepClasses); // Debugging: log the step classes
    expect(stepClasses).toEqual([
      `step ng-star-inserted ${step1}`,
      `step ng-star-inserted ${step2}`,
      `step ng-star-inserted${step3}`,
    ]);
  }
  async validateCardInput() {
    const stripeFrame = this.page.frameLocator(
      ".__PrivateStripeElement iframe"
    );
    await stripeFrame.locator("#Field-numberInput").fill("4242");
    await stripeFrame.locator("#Field-expiryInput").click();
    await expect(stripeFrame.locator("#Field-numberError")).toHaveText(
      "Your card number is incomplete."
    );
  }
  async fillCardDetails(frame, cardNumber) {
    await frame.locator("#Field-numberInput").fill(cardNumber, { delay: 100 });
    await frame.locator("#Field-expiryInput").fill("12/34");
    await frame.locator("#Field-cvcInput").fill("567");
    await frame.locator("#Field-countryInput").selectOption("US");
    await frame.locator("#Field-postalCodeInput").fill("90210");
  }
  async testCardTypes() {
    const stripeFrame = this.page.frameLocator(
      ".__PrivateStripeElement iframe"
    );
    const cardTypes = [
      { number: "4242424242424242", type: "Visa" },
      { number: "5555555555554444", type: "Mastercard" },
      { number: "378282246310005", type: "American Express" },
    ];
    for (const { number, type } of cardTypes) {
      await this.fillCardDetails(stripeFrame, number);
      await expect(stripeFrame.locator("#knownCardBrandDesc")).toContainText(
        type
      );
    }
  }
  async submitPayment() {
    await this.page.locator("#defaultCheck2").click();
    await this.page
      .locator('[class="mdc-button__label"]:nth-of-type(2)')
      .click();
  }
}
// export default class FormPage {
// constructor(page) {
//     this.page = page;
//   }
//   async submitForm(fname,lname, email, phone) {
//     const firstName = await this.page.locator("#mat-input-0").fill(fname);
//     const lastName = await this.page.locator("#mat-input-1").fill(lname);
//     const e_mail = await this.page.locator("#mat-input-2").fill(email);
//     const _phone = await this.page.locator("#mat-input-3").fill(phone);
//     const dropdownItem = await this.page.getByText(
//       "How did you hear about us?"
//     );
//     await dropdownItem.click();
//   }
// }
