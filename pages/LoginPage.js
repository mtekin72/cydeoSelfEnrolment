import BasePage from "./BasePage";
// export default class LoginPage extends BasePage {
//   async login() {
//         let encodedCredential = Buffer.from(
//           `${process.env.USERNAME}:${process.env.PASSWORD}`
//         ).toString("base64");
//         await this.page.setExtraHTTPHeaders({
//           Authorization: `Basic ${encodedCredential}`,
//         });
//         await this.page.goto(process.env.BASE_URL);
//   }
// }
export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }
  async login() {
    let encodedCredential = Buffer.from(
      `${process.env.USERNAME}:${process.env.PASSWORD}`
    ).toString("base64");
    await this.page.setExtraHTTPHeaders({
      Authorization: `Basic ${encodedCredential}`,
    });
    await this.page.goto(process.env.BASE_URL);
    await this.page.waitForTimeout(3000);
  }
}
