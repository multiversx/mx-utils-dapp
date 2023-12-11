import Homepage from "../pageobjects/HomePage";

describe("My Login application", () => {
  beforeEach(async () => {
    await Homepage.open("/");
  });
  it("should propely display the title of the page", async () => {
    await Homepage.titlesCheck();
  });

  it("should use the propely href ", async () => {
    await Homepage.checkHrefProps();
  });
});
