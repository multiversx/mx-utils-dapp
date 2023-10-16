import type { Dispatch, SetStateAction } from 'react';
import type { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { DEPLOY_ENV_KEY, UPGRADE_ENV_KEY } from '../../constants';

export interface EnvironmentPropsType {
  chain: EnvironmentsEnum;
  setChain: Dispatch<SetStateAction<EnvironmentsEnum>>;
  networkKey: typeof DEPLOY_ENV_KEY | typeof UPGRADE_ENV_KEY;
}

export interface OptionType {
  value: EnvironmentsEnum;
  label: EnvironmentsEnum;
}
