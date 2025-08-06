import { EnvironmentsEnum } from 'lib';

export interface StateType {
  isMenuToggled: boolean;
  dappEnvironment: EnvironmentsEnum;
}

export const initializer: StateType = {
  isMenuToggled: false,
  dappEnvironment: EnvironmentsEnum.mainnet
};
