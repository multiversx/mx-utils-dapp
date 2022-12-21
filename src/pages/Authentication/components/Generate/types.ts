import type { Dispatch, SetStateAction } from 'react';

export interface GeneratePropsType {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}
