import { useLocation } from 'react-router-dom';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { NETWORK } from '../constants';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { useMemo } from 'react';
import { getEnvironmentForChainId } from '@multiversx/sdk-dapp/apiCalls/configuration/getEnvironmentForChainId';

export const useChain = () => {
  const { search } = useLocation();
  const { network } = useGetNetworkConfig();

  const entries = Object.fromEntries(new URLSearchParams(search));
  const environment = entries[NETWORK] as EnvironmentsEnum;
  const chain = useMemo<EnvironmentsEnum>(
    () => environment || getEnvironmentForChainId(network.chainId),
    [environment, network.chainId]
  );

  return { chain };
};
