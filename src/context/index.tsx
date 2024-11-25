import {
  createContext,
  useReducer,
  useContext,
  PropsWithChildren,
} from 'react';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import { PERSISTED_NETWORK_KEY } from 'localConstants';
import { DispatchType, reducer } from './reducer';
import { StateType, initializer } from './state';

const Context = createContext<StateType | undefined>(undefined);
const Dispatch = createContext<DispatchType | undefined>(undefined);

const ContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const env =
    (sessionStorage.getItem(PERSISTED_NETWORK_KEY) as EnvironmentsEnum) ??
    initializer.dappEnvironment;

  const [state, dispatch] = useReducer(reducer, {
    ...initializer,
    dappEnvironment: env,
  });

  return (
    <Context.Provider value={state}>
      <DappProvider
        environment={state.dappEnvironment}
        customNetworkConfig={{
          name: 'customConfig',
          apiTimeout: 6000,
          walletConnectV2ProjectId: '9b1a9564f91cb659ffe21b73d5c4e2d8',
          metamaskSnapWalletAddress:
            state.dappEnvironment === EnvironmentsEnum.mainnet
              ? 'https://snap-wallet.multiversx.com'
              : 'https://devnet-snap-wallet.multiversx.com',
        }}
        dappConfig={{ shouldUseWebViewProvider: true }}
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
      'The useGlobalContext hook must be used within a Context.Provider.',
    );
  } else {
    return context;
  }
};

const useDispatch = () => {
  const context = useContext(Dispatch);

  if (context === undefined) {
    throw new Error(
      'The useDispatch hook must be used within a Dispatch.Provider.',
    );
  } else {
    return context;
  }
};

export { ContextProvider, useGlobalContext, useDispatch };
