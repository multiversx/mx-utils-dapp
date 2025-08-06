import path from 'path';
import { GlobalDataEnum } from './globalDataEnum';
import { GlobalSelectorEnum } from './globalSelectorEnum';

export const getSelector = async (selector: string) => {
  const element = await $(`[data-testid="${selector}"]`);
  if (!element.isExisting()) {
    throw new Error(`Element with data-testid "${selector}" not found.`);
  }
  return element;
};

export const uploadFile = async (fileName: string) => {
  const file = await $('input[type="file"]');
  const filePath = path.join(__dirname, `/${fileName}`);

  await browser.execute((el) => ((el as any).style.display = 'block'), file);
  file.waitForDisplayed();
  await file.setValue(filePath);
};

export const login = async () => {
  const wallet = await $('button*=MultiversX Web Wallet');
  const pemBtn = await getSelector(GlobalSelectorEnum.pemBtn);
  const accesWallet = await getSelector(GlobalSelectorEnum.submitButton);

  await wallet.click();
  await pemBtn.click();
  await uploadFile(GlobalDataEnum.pemFile);
  await accesWallet.click();
};

export const checkValidity = async (payload: any) => {
  await expect(payload.selector).toContain(payload.validityMsg);
};

export const changeNetwork = async () => {
  const svgElement = await $('svg[data-icon="arrow-down-long"]');
  const dropdownElement = await $(`div*=${GlobalDataEnum.devnetNetwork}`);

  await svgElement.click();
  await dropdownElement.click();
};
