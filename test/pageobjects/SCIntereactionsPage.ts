import Page from "./Page";
import { GlobalDataEnum, RoutesEnum } from "../utils/globalDataEnum";
import { GlobalSelectorEnum } from "../utils/globalSelectorEnum";
import { uploadFile } from "../utils/helpers";
import { readEndpoints } from "../utils/testData";

class SCInteractionsPage extends Page {
  public open() {
    return super.open(RoutesEnum.scDeploy);
  }

  public get abiHeader() {
    const abiHeaderText = $(`h6*=${GlobalDataEnum.abiPrevieText}`);
    return abiHeaderText;
  }

  async adressInputHandler(adress: string) {
    const adressInput = await $(`input[name="contractAddress"]`);
    await adressInput.setValue(adress);
  }

  async loadAbiHandler() {
    await uploadFile(GlobalDataEnum.abiFile);
  }

  async checkBuildInfo() {
    const buildInfoLink = await $(`a*=${GlobalDataEnum.buildInfoLink}`);
    const buildInfoName = await $(`div*=${GlobalDataEnum.buildName}`);
    const frameworkName = await $(`div*=${GlobalDataEnum.frameworkName}`);

    await buildInfoLink.click();
    await expect(buildInfoName).toBeDisplayed();
    await expect(frameworkName).toBeDisplayed();
  }
  async validateEndpoints() {
    let endpointResponse;

    for (let i = 0; i < readEndpoints.length; i++) {
      endpointResponse = await $(`body*=${readEndpoints[i]}`);
      await expect(endpointResponse).toBeDisplayed();
    }
  }

  async readEndpointsHandler() {
    const expandAllBtn = await $(`button*=${GlobalSelectorEnum.expandAll}`);
    const queryBtns = await $$(`button*=${GlobalSelectorEnum.queryBtn}`);
    const readEndpointBtn = await $(`a*=${GlobalSelectorEnum.readEndpoint}`);

    await readEndpointBtn.click();
    await expandAllBtn.click();
    await browser.pause(500);
    await driver.waitUntil(async () => (await queryBtns.length) >= 1);

    for (let index = 0; index < queryBtns.length; index++) {
      await queryBtns[index].click();
    }
    await this.validateEndpoints();
  }
 //TO DO : Enable after selector update
  // async deployContract() {
  //   const contractInputs = await $$("input[type='text']");
  //   const deployContract = await $(`a*=${GlobalSelectorEnum.deployContract}`);
  //   const svgSselector = await $('svg[data-icon="bolt"]');
  //   const walletConnectBtn = await $(
  //     `button*=${GlobalSelectorEnum.walletConnectBtn}`
  //   );
  //   const linkElement = await $('a[href="https://multiversx.com/"]');

  //   // const btnClass = await $();

  //   await deployContract.click();
  //   // await driver.waitUntil(async () => await svgSselector.isDisplayed());
  //   // await linkElement.scrollIntoView();
  //   await browser.pause(3000);
  //   // await driver.waitUntil(async () => (await contractInputs.length) >= 1);
  //   // await console.log(contractInputs[0]);

  //   let energyInputClass = await $$(".mx-sdk-sc-input");
  //   console.log(await energyInputClass.length);

  //   // await contractInputs[1].click();
  //   // await browser.pause(5000);

  //   // await btnClass.waitForDisplayed();
  //   // await btnClass.click();

  //   // await contractInputs.scrollIntoView();

  //   // await uploadFile(GlobalDataEnum.contractFile);
  //   // await contractInputs.setValue("1");
  // }
}

export default new SCInteractionsPage();
