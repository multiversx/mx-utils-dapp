import type { Dispatch, SetStateAction } from 'react';
import type { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export interface EnvironmentPropsType {
  chain: EnvironmentsEnum;
  setChain: Dispatch<SetStateAction<EnvironmentsEnum>>;
  networkKey: "deploy-env" | "upgrade-env";
}

export interface OptionType {
  value: EnvironmentsEnum;
  label: EnvironmentsEnum;
}
