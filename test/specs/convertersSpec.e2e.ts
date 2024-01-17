import ConvertersPage from "../pageobjects/ConvertersPage";

describe("Converters Tests", () => {
  beforeEach(async () => {
    ConvertersPage.open();
    await driver.waitUntil(
      async () => (await ConvertersPage.inputFields.length) >= 1
    );
  });
  afterEach(async () => {
    await browser.reloadSession();
  });
  it("should accept valid values and return properly results", async () => {
    await ConvertersPage.completeTheInputs();
  });

  it("should return required message", async () => {
    await ConvertersPage.checkRequiredFields();
  });
});
