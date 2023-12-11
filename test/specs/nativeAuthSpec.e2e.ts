import AuthPage from "../pageobjects/NativeAuthPage";
import { login } from "../utils/helpers";

describe("Native Auth ", () => {
  beforeEach(async () => {
    AuthPage.open();
  });
  it("should generate token", async () => {
    await AuthPage.generateToken();
    await login();
    await AuthPage.checkTokenValidity();
    await browser.pause(5000);
  });
});
