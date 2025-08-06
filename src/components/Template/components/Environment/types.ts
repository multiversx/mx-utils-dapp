import { EnvironmentsEnum } from 'lib';

export interface EnvironmentPropsType {
  chain: EnvironmentsEnum;
}

export interface OptionType {
  value: EnvironmentsEnum;
  label: EnvironmentsEnum;
}
