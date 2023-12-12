import Page from './Page';
import { GlobalDataEnum, RoutesEnum } from '../utils/globalDataEnum';
import { GlobalSelectorEnum } from '../utils/globalSelectorEnum';
import { getSelector } from '../utils/helpers';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  public get homePageTitle() {
    return getSelector(GlobalSelectorEnum.homeTitle);
  }
  public get homePageDescription() {
    return getSelector(GlobalSelectorEnum.homeDescription);
  }

  public async titlesCheck() {
    const titlePage = await this.homePageTitle;
    const descriptionPage = await this.homePageDescription;

    await expect(titlePage).toHaveText(GlobalDataEnum.homePageTitle);
    await expect(descriptionPage).toHaveText(
      GlobalDataEnum.homePageDescription,
    );
  }

  public async checkHrefProps() {
    const linkArr = [
      GlobalSelectorEnum.convertersLink,
      GlobalSelectorEnum.explainerLink,
      GlobalSelectorEnum.nativeAuthLink,
      GlobalSelectorEnum.signMsgLink,
      GlobalSelectorEnum.scDeployLink,
      GlobalSelectorEnum.loginLink,
    ];
    const routes = [
      RoutesEnum.converters,
      RoutesEnum.explainer,
      RoutesEnum.auth,
      RoutesEnum.signMsg,
      RoutesEnum.scDeploy,
      RoutesEnum.login,
    ];
    for (let i = 0; i < linkArr.length; i++) {
      const linkElement = await getSelector(linkArr[i]);
      await linkElement.click();
      await expect(browser).toHaveUrlContaining(routes[i]);
    }
  }
}

export default new HomePage();
