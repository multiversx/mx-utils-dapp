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

import { EnvironmentsEnum, InitAppType } from './lib';

(window as any).multiversx = {};

export const dAppConfig: InitAppType['dAppConfig'] = {
  nativeAuth: true,
  environment: EnvironmentsEnum.devnet,
  providers: {
    walletConnect: {
      walletConnectV2ProjectId: '9b1a9564f91cb659ffe21b73d5c4e2d8'
    }
  }
};
