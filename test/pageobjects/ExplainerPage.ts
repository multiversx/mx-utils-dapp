import Page from "./Page";
import { RoutesEnum } from "../utils/globalDataEnum";
class ExplainerPage extends Page {
  public get errorMsg() {
    const erroSelector = $(
      `//*[@id="root"]/div/div/div[2]/div/div/div/form/div[1]/div`
    ).getText();
    return erroSelector;
  }

  public get firstParagraph() {
    const paragraphText = $("p").getText();
    return paragraphText;
  }

  async checkExplainer(url: string) {
    const inputExplainer = await $('[name="repositoryUrl"]');
    const explainBtn = await $("button*=Explain");

    await inputExplainer.setValue(url);
    await explainBtn.click();
  }

  public open() {
    return super.open(RoutesEnum.explainer);
  }
}

export default new ExplainerPage();
