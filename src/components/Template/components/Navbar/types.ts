import type { Dispatch, SetStateAction } from 'react';

export interface NavbarPropsType {
  toggleMenu: boolean;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
}
