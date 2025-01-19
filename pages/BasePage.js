import { test, expect } from "@playwright/test";
export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path) {
    await this.page.goto(`${process.env.BASE_URL}${path}`);
  }

  async waitForElement(selector) {
    await this.page.waitForSelector(selector);
  }

  async assertElementText(selector, expectedText) {
    const element = this.page.locator(selector);
    await expect(element).toContainText(expectedText);
  }
}
