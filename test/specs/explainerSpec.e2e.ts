import ExplainerPage from "../pageobjects/ExplainerPage";
import { GlobalDataEnum } from "../utils/globalDataEnum";
import { checkValidity } from "../utils/helpers";

describe("Explainer", () => {
  beforeEach(async () => {
    await ExplainerPage.open();
  });
  it("should return the explain modal", async () => {
    await ExplainerPage.checkExplainer(GlobalDataEnum.explainValidUrl);
    await browser.pause(10000);
    const confirmSelector = await ExplainerPage.firstParagraph;
    const validiationData = {
      selector: confirmSelector,
      validityMsg: GlobalDataEnum.firstExplainerParagraph,
    };
    await checkValidity(validiationData);
  });
  it("should return the explain modal", async () => {
    await ExplainerPage.checkExplainer(GlobalDataEnum.invalidGitUrl);
    await browser.pause(5000);
    const errorSelector = await ExplainerPage.errorMsg;
    const validiationData = {
      selector: errorSelector,
      validityMsg: GlobalDataEnum.errorExplainerMsg,
    };
    await checkValidity(validiationData);
  });
});
