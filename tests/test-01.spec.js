import { test,expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test.beforeEach("Bypass authentication by encoding the cridentials based 64 format", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();
});

test("Check that there are three circle steps", async ({ page }) => {
  const stepsLocator = await page.locator('[class="step-circle"]').all();
  const expectedSteps=['1', '2', '3'];
  const actualSteps = [];
  for (const step of stepsLocator) {
    const stepText = await step.innerText();
    actualSteps.push(stepText);
    console.log(stepText);
   
  }

 console.log(actualSteps);
 expect(actualSteps).toEqual(expectedSteps);
});

test("Check that there are three circle steps-second option", async ({ page }) => {
  const stepsLocator = page.locator('[class="step-circle"]');
  const expectedSteps = ["1", "2", "3"];

  // Get all the text content in a single step
  const actualSteps = await stepsLocator.allTextContents();

  // Log the actual steps for debugging
  console.log(actualSteps);

  // Assert that the actual steps match the expected steps
  expect(actualSteps).toEqual(expectedSteps);
});

test("Validate that that step names are correct", async ({ page }) => {
  const expectedText = ["Start Application", "Payment plan", "Review"];
  const actualText = [];
  const stepText = await page.locator('[class="step-title"]').all();
  for(const e of stepText) {
      const text=await e.innerText();
      actualText.push(text);

  }
  console.log(`Actual Steps: ${actualText}`);
  expect(actualText).toEqual(expectedText);
});

