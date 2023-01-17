import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import type { Dispatch, SetStateAction } from 'react';

export interface EnvironmentPropsType {
  chain: string;
  setChain: Dispatch<SetStateAction<EnvironmentsEnum>>;
}

export interface OptionType {
  value: EnvironmentsEnum | string;
  label: EnvironmentsEnum | string;
}
