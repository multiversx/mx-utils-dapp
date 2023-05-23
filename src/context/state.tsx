import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { defaultTheme } from 'config';
import { ThemeEnumType } from 'helpers/enum';

export interface StateType {
  isMenuToggled: boolean;
  theme?: ThemeEnumType.dark | ThemeEnumType.light;
  dappEnvironment: EnvironmentsEnum | undefined;
}

export const initializer: StateType = {
  isMenuToggled: false,
  theme: defaultTheme,
  dappEnvironment: EnvironmentsEnum.mainnet
};
