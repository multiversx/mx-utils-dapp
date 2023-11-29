import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export interface StateType {
  isMenuToggled: boolean;
  dappEnvironment: EnvironmentsEnum;
}

export const initializer: StateType = {
  isMenuToggled: false,
  dappEnvironment: EnvironmentsEnum.mainnet,
};
