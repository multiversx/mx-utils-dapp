import type { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export interface EnvironmentPropsType {
  chain: EnvironmentsEnum;
}

export interface OptionType {
  value: EnvironmentsEnum;
  label: EnvironmentsEnum;
}
