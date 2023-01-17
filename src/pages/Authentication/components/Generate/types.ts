import type { Dispatch, SetStateAction } from 'react';

export interface GeneratePropsType {
  show: boolean;
  chain: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}
