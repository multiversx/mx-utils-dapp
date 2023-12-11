import SCInteractionsPage from "../pageobjects/SCIntereactionsPage";
import { GlobalDataEnum } from "../utils/globalDataEnum";
import { checkValidity, changeNetwork } from "../utils/helpers";

describe("SC Interactions", () => {
  it.only("Should successfully validate the ABI.", async () => {
    SCInteractionsPage.open();
    await changeNetwork();
    await SCInteractionsPage.adressInputHandler(GlobalDataEnum.scAdress);
    await SCInteractionsPage.loadAbiHandler();
    const errorSelector = await SCInteractionsPage.abiHeader;
    await expect(errorSelector).toBeDisplayed();
  });

  it.only("should properly display the build info", async () => {
    await SCInteractionsPage.checkBuildInfo();
  });

  it("should properly display endpoints", async () => {
    await SCInteractionsPage.readEndpointsHandler();
  });

  it.only("deploy contract", async () => {
    await SCInteractionsPage.deployContract();
    await browser.pause(10000);
  });
});