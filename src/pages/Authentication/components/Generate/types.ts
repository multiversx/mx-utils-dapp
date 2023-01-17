import type { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import type { Dispatch, SetStateAction } from 'react';

export interface GeneratePropsType {
  show: boolean;
  chain: EnvironmentsEnum;
  setShow: Dispatch<SetStateAction<boolean>>;
}
