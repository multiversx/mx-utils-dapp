import type { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import type { Dispatch, SetStateAction } from 'react';

export interface GeneratePropsType {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  chain: EnvironmentsEnum;
}
