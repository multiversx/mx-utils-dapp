import {
  createContext,
  useReducer,
  useContext,
  PropsWithChildren
} from 'react';

import { DispatchType, reducer } from './reducer';
import { StateType, initializer } from './state';

const Context = createContext<StateType | undefined>(undefined);
const Dispatch = createContext<DispatchType | undefined>(undefined);

const ContextProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initializer);

  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(
      'The useGlobalContext hook must be used within a Context.Provider.'
    );
  } else {
    return context;
  }
};

const useDispatch = () => {
  const context = useContext(Dispatch);

  if (context === undefined) {
    throw new Error(
      'The useDispatch hook must be used within a Dispatch.Provider.'
    );
  } else {
    return context;
  }
};

export { ContextProvider, useGlobalContext, useDispatch };
