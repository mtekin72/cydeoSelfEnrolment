// src/tests/paymentValidation.test.js
import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage"; // Adjust path as necessary
import FormPage from "../pages/FormPage"; // Adjust path as necessary
import PaymentAction from "../actions/paymentActions"; // Adjust path as necessary
import BasePage from "../pages/BasePage";
import { userInfo } from "os";

test.describe("Payment Validation E2E Test", () => {
  let paymentAction;
  let basePage; 
  let formPage;

  test.beforeEach(async ({ page }) => {
    paymentAction = new PaymentAction(page);
      basePage = new BasePage(page);
      formPage = new FormPage(page);
     const userData = {
       fname: "Marie",
       lname: "Dupont",
       email: "test@example.com",
       phone: "98765432112",
     };
    await paymentAction.completePayment(userData); 
  });

  test("validates payment process  of Upfront Payment and next button is not visible until payment plan is selected", async ({page }) => {
    const nextButton = page.locator('[class="action-buttons"] button');
    await expect(nextButton).toBeDisabled();
    await paymentAction.chosePaymentPlan("Upfront"); // 5 Installments, Upfront
    await expect(nextButton).toBeEnabled();
    basePage.assertElementText('[class="discount-price"]', "400");
    await paymentAction.chosePaymentPlan("5 Installments"); // 5 Installments, Upfront
  });
 test("Verify Payment Steps Page", async ({
   page,
 }) => {
 await paymentAction.chosePaymentPlan("Upfront");
 await formPage.verifyPaymentSteps("done", "editing", "");
 const nextButton = page.locator('[class="action-buttons"] button');
 await nextButton.click();
 //await formPage.verifyPaymentSteps("done", "done", "editing");

 
 });
 test("Verify Card Invalid Imput", async ({ page }) => {
      const nextButton = page.locator('[class="action-buttons"] button');
  await paymentAction.chosePaymentPlan("Upfront");
   await nextButton.click();
  await formPage.validateCardInput();
 });

  test(" Validate Card Form fields with valid data ", async ({ page }) => {
        const nextButton = page.locator('[class="action-buttons"] button');
        await paymentAction.chosePaymentPlan("Upfront");
        await nextButton.click();
        await formPage.testCardTypes();
        await formPage.submitPayment(); 
  });
})





// Function to verify confirmation message after payment submission


// import { test, expect } from "@playwright/test";
// import FormPage from "../pages/FormPage";
// import LoginPage from "../pages/LoginPage";

// test.describe("Payment Validation E2E Test", () => {
//   let formPage;

//   test.beforeEach(async ({ page }) => {
//     await new LoginPage(page).login();
//     formPage = new FormPage(page);
//   });

//   test("validates payment process", async ({ page }) => {
//     await formPage.submitForm(
//       "Marie",
//       "Dupont",
//       "test@example.com",
//       "98765432112"
//     );
//     await selectPaymentMethod(page);
//     await verifySteps(page);
//     await selectDiscountPayment(page);
//     await verifyStepClasses(page);
//     await validateCardInput(page);
//     await testCardTypes(page);
//     await verifyPricing(page);
//     await submitPayment(page);
//     await verifyConfirmation(page);
//   });
// });

// async function selectPaymentMethod(page) {
//   await page.getByText("Google").click();
//   await page.locator('[type="submit"]').click();
// }

// async function verifySteps(page) {
//   const stepTitles = await page.locator(".step-title").allTextContents();
//   expect(stepTitles).toEqual(["Start Application", "Payment plan", "Review"]);
// }

// async function selectDiscountPayment(page) {
//   await page.locator('[class="discount-price"]').click();
//   await page.locator(".action-buttons > button").click();
// }

// async function verifyStepClasses(page) {
//   const stepClasses = await Promise.all(
//     (await page.locator(".step").all()).map((el) => el.getAttribute("class"))
//   );
//   expect(stepClasses).toEqual([
//     "step ng-star-inserted done",
//     "step ng-star-inserted done",
//     "step ng-star-inserted editing",
//   ]);
// }

// async function validateCardInput(page) {
//   const stripeFrame = page.frameLocator(".__PrivateStripeElement iframe");
//   await stripeFrame.locator("#Field-numberInput").fill("4242");
//   await stripeFrame.locator("#Field-expiryInput").click();
//   await expect(stripeFrame.locator("#Field-numberError")).toHaveText(
//     "Your card number is incomplete."
//   );
// }

// async function testCardTypes(page) {
//   const stripeFrame = page.frameLocator(".__PrivateStripeElement iframe");
//   const cardTypes = [
//     { number: "4242424242424242", type: "Visa" },
//     { number: "5555555555554444", type: "Mastercard" },
//     { number: "378282246310005", type: "American Express" },
//   ];

//   for (const { number, type } of cardTypes) {
//     await fillCardDetails(stripeFrame, number);
//     await expect(stripeFrame.locator("#knownCardBrandDesc")).toContainText(
//       type
//     );
//   }
// }

// async function fillCardDetails(frame, cardNumber) {
//   await frame.locator("#Field-numberInput").fill(cardNumber, { delay: 100 });
//   await frame.locator("#Field-expiryInput").fill("12/34");
//   await frame.locator("#Field-cvcInput").fill("567");
//   await frame.locator("#Field-countryInput").selectOption("US");
//   await frame.locator("#Field-postalCodeInput").fill("90210");
// }

// async function verifyPricing(page) {
//   const priceLocators = {
//     productPrice:
//       '[class="panel-content-payment"] div:nth-of-type(1) span:nth-child(2)',
//     upfrontDiscount:
//       '[class="panel-content-payment"] div:nth-of-type(2) span:nth-child(2)',
//     subTotal:
//       '[class="panel-content-payment"] div:nth-of-type(3) span:nth-child(2)',
//     processingFee:
//       '[class="panel-content-payment"] div:nth-of-type(4) span:nth-child(2)',
//     total:
//       '[class="panel-content-payment"] div:nth-of-type(5) span:nth-child(2)',
//   };

//   const expectedPrices = ["$500", "- $100", "$400", "$12", "$412"];

//   for (const [key, selector] of Object.entries(priceLocators)) {
//     await expect(page.locator(selector)).toHaveText(expectedPrices.shift());
//   }
// }

// async function submitPayment(page) {
//   await page.locator("#defaultCheck2").click();
//   await page.locator('[class="mdc-button__label"]:nth-of-type(2)').click();
// }

// async function verifyConfirmation(page) {
//   await page.waitForLoadState();
//     const confirmationMessage = await page
//       .getByText("Payments confirmation")
//       .innerText();
//     expect(confirmationMessage).toEqual("Payments confirmation ");
// }

// import { test, expect } from "@playwright/test";
// import FormPage from "../pages/FormPage";
// import LoginPage from "../pages/LoginPage";

// test.beforeEach(async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   await loginPage.login();
// });
// test("e2e test for payment validation", async ({ page }) => {
//   const formPage = new FormPage(page);

//   // Fill the form
//   await formPage.submitForm(
//     "Marie",
//     "Dupont",
//     "test@example.com",
//     "98765432112"
//   );

//   // Select payment method
//   await page.getByText("Google").click();
//   const nextButton = page.locator('[type="submit"]');
//   await nextButton.click();

//   const stepElements = await page.locator(".step").all();
//   console.log(stepElements);
//   // Get the class for each step

//   // Optionally, you can assert the text content of the steps if needed
//   const stepTitles = await page.locator(".step-title").allTextContents();
//   console.log(stepTitles); // Debugging: check the step titles
//   expect(stepTitles).toEqual(["Start Application", "Payment plan", "Review"]);

//   // Select discount payment
//   await page.locator('[class="discount-price"]').click();
//   await page.locator(".action-buttons > button").click();

//   const firstStepClass = await stepElements[0].getAttribute("class");
//   const secondStepClass = await stepElements[1].getAttribute("class");
//   const thirdStepClass = await stepElements[2].getAttribute("class");

//   expect(firstStepClass).toEqual("step ng-star-inserted done"); // Step 1 should have the class "done"
//   expect(secondStepClass).toEqual("step ng-star-inserted done"); // Step 2 should have the class "editing"
//   expect(thirdStepClass).toEqual("step ng-star-inserted editing"); // Step 3 should not have the class "done"

//   // Interact with Stripe iframe for card details
//   const stripeFrame = page.frameLocator(".__PrivateStripeElement iframe");
//   const cardInputField = stripeFrame.locator("#Field-numberInput");
//   await cardInputField.fill("4242");
//   // await page.waitForTimeout(3000);
//   await cardInputField.press("Enter");
//   //await page.waitForTimeout(3000)
//   // Trigger validation (e.g., by clicking outside the input field or submitting the form)
//   await stripeFrame.locator("#Field-expiryInput").click();

//   // Locate the error message element
//   const errorMessageLocator = stripeFrame.locator("#Field-numberError");

//   // Wait for the error message to appear
//   await expect(errorMessageLocator).toBeVisible();

//   // Assert the error message content
//   const errorMessage = await errorMessageLocator.textContent();
//   console.log(`Error Message:${errorMessage}`);
//   expect(errorMessage).toBe("Your card number is incomplete.");

//   const cardNumbers = [
//     { number: "4242424242424242", type: "Visa" },
//     { number: "5555555555554444", type: "Mastercard" },
//     { number: "378282246310005", type: "American Express" },
//   ];

//   for (const card of cardNumbers) {
//     // Fill card details
//     await stripeFrame
//       .locator("#Field-numberInput")
//       .fill(card.number, { delay: 100 });
//     await stripeFrame.locator("#Field-expiryInput").fill("12/34");
//     await stripeFrame.locator("#Field-cvcInput").fill("567");

//     // Verify card type
//     const cardTypeText = await stripeFrame
//       .locator("#knownCardBrandDesc")
//       .textContent();
//     console.log("Card type detected:", cardTypeText);

//     // Assert based on card type
//     expect(cardTypeText).toContain(card.type);
//     console.log(`Card type identified as ${card.type}.`);

//     // Select country
//     await stripeFrame.locator("#Field-countryInput").selectOption("US");
//     const selectedCountry = await stripeFrame
//       .locator("#Field-countryInput")
//       .inputValue();
//     console.log("Selected country:", selectedCountry);

//     if (selectedCountry === "US") {
//       // Fill ZIP code if country is US
//       const zipcodeInput = stripeFrame.locator("#Field-postalCodeInput");
//       await zipcodeInput.fill("90210");
//     } else {
//       console.log(
//         "ZIP code not required for selected country:",
//         selectedCountry
//       );
//     }
//   }

//   // Accept agreement and submit
//   await page.locator("#defaultCheck2").click();
//   const submitButton = page.locator(
//     '[class="mdc-button__label"]:nth-of-type(2)'
//   );

//   //price validation
//   const productPrice = page.locator(
//     '[class="panel-content-payment"] div:nth-of-type(1) span:nth-child(2)'
//   );
//   const upfrontDiscount = page.locator(
//     '[class="panel-content-payment"] div:nth-of-type(2) span:nth-child(2)'
//   );
//   const subTotal = page.locator(
//     '[class="panel-content-payment"] div:nth-of-type(3) span:nth-child(2)'
//   );
//   const processingFee = page.locator(
//     '[class="panel-content-payment"] div:nth-of-type(4) span:nth-child(2)'
//   );
//   const total = page.locator(
//     '[class="panel-content-payment"] div:nth-of-type(5) span:nth-child(2)'
//   );
//   // Get the text content of the element
//   const textContent1 = await productPrice.textContent();
//   const textContent2 = await upfrontDiscount.textContent();
//   const textContent3 = await subTotal.textContent();
//   const textContent4 = await processingFee.textContent();
//   const textContent5 = await total.textContent();

//   // Assert the expected text
//   expect(textContent1).toBe("$500");
//   console.log(textContent1);
//   expect(textContent2).toBe("- $100");
//   console.log(textContent2);
//   expect(textContent3).toBe("$400");
//   console.log(textContent3);
//   expect(textContent4).toBe("$12");
//   console.log(textContent4);
//   expect(textContent5).toBe("$412");
//   console.log(textContent5);

//   await submitButton.waitFor({ state: "visible", timeout: 10000 });
//   await submitButton.click();

//   // Verify confirmation message
//   await page.waitForLoadState();
//   const confirmationMessage = await page
//     .getByText("Payments confirmation")
//     .innerText();
//   expect(confirmationMessage).toEqual("Payments confirmation ");
// });
