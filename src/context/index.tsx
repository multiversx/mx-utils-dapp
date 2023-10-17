import {
  createContext,
  useReducer,
  useContext,
  PropsWithChildren
} from 'react';

import { DispatchType, reducer } from './reducer';
import { StateType, initializer } from './state';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import { useLocation } from 'react-router-dom';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

const Context = createContext<StateType | undefined>(undefined);
const Dispatch = createContext<DispatchType | undefined>(undefined);

const ContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const network = params.get('network') ?? initializer.dappEnvironment;

  const [state, dispatch] = useReducer(reducer, {
    ...initializer,
    dappEnvironment: network as EnvironmentsEnum
  });

  return (
    <Context.Provider value={state}>
      <DappProvider
        environment={state.dappEnvironment}
        customNetworkConfig={{
          name: 'customConfig',
          apiTimeout: 6000,
          walletConnectV2ProjectId: '9b1a9564f91cb659ffe21b73d5c4e2d8'
        }}
      >
        <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
      </DappProvider>
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
