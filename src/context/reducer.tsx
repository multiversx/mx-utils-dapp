import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

import { StateType } from './state';

export enum ActionTypeEnum {
  switchDappEnvironment = 'switchDappEnvironment'
}

export type DispatchType = (action: ActionType) => void;
export type ActionType = {
  type: ActionTypeEnum;
  dappEnvironment?: EnvironmentsEnum;
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ActionTypeEnum.switchDappEnvironment: {
      return {
        ...state,
        dappEnvironment: action.dappEnvironment
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

export { reducer };
