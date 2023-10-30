import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export const applicationName = 'Utils';
export const companyName = 'MultiversX';
export const companyWebsite = 'https://multiversx.com/';
export const explainerApiUrl = '/xbot/api/xai';

export const ApiBaseUrls = {
  [EnvironmentsEnum.mainnet]: 'https://tools.multiversx.com',
  [EnvironmentsEnum.devnet]: 'https://devnet-tools.multiversx.com',
  [EnvironmentsEnum.testnet]: 'https://testnet-tools.multiversx.com'
};

export const miscApi = 'https://misc-api.multiversx.com';
