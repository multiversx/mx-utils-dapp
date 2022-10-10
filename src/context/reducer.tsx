import { StateType } from './state';

export type DispatchType = (action: ActionType) => void;
export type ActionType = {
  type: 'getIsMenuToggled';
  isMenuToggled: StateType['isMenuToggled'];
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'getIsMenuToggled': {
      return {
        ...state,
        isMenuToggled: action.isMenuToggled
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

export { reducer };
