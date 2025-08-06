import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer
} from 'react';

import { EnvironmentsEnum } from 'lib';
import { PERSISTED_NETWORK_KEY } from 'localConstants';
import { DispatchType, reducer } from './reducer';
import { initializer, StateType } from './state';

const Context = createContext<StateType | undefined>(undefined);
const Dispatch = createContext<DispatchType | undefined>(undefined);

const ContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const env =
    (sessionStorage.getItem(PERSISTED_NETWORK_KEY) as EnvironmentsEnum) ??
    initializer.dappEnvironment;

  const [state, dispatch] = useReducer(reducer, {
    ...initializer,
    dappEnvironment: env
  });

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
