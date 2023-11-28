import { useMemo } from 'react';
import { getEnvironmentForChainId } from '@multiversx/sdk-dapp/apiCalls/configuration/getEnvironmentForChainId';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { useLocation } from 'react-router-dom';
import { NETWORK_KEY } from 'localConstants';

export const useChain = () => {
  const { search } = useLocation();
  const { network } = useGetNetworkConfig();

  const entries = Object.fromEntries(new URLSearchParams(search));
  const environment = entries[NETWORK_KEY] as EnvironmentsEnum;
  const chain = useMemo<EnvironmentsEnum>(
    () => environment || getEnvironmentForChainId(network.chainId),
    [environment, network.chainId],
  );

  return { chain };
};
