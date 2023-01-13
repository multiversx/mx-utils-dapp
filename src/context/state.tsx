import { defaultTheme } from 'config';
import { ThemeEnumType } from 'helpers/enum';

export interface StateType {
  isMenuToggled: boolean;
  theme: ThemeEnumType.dark | ThemeEnumType.light;
}

export const initializer: StateType = {
  isMenuToggled: false,
  theme: defaultTheme
};
