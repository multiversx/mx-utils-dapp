import { StateType } from './state';

export type DispatchType = (action: ActionType) => void;
export type ActionType =
  | {
      type: 'getIsMenuToggled';
      isMenuToggled: StateType['isMenuToggled'];
    }
  | {
      type: 'switchTheme';
      theme: StateType['theme'];
    };

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'getIsMenuToggled': {
      return {
        ...state,
        isMenuToggled: action.isMenuToggled
      };
    }

    case 'switchTheme': {
      return {
        ...state,
        theme: action.theme
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
};

export { reducer };
