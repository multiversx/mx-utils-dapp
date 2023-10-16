import axios from 'axios';
import { useEffect, useState } from 'react';
import { Address } from '@multiversx/sdk-core/out';
import {
  useGetIsLoggedIn,
  useGetNetworkConfig,
  useGetSuccessfulTransactions
} from '@multiversx/sdk-dapp/hooks';

export const useGetDeployedContractAddress = (sessionId: string) => {
  const [contractOrDeployerAddress, setContractOrDeployerAddress] =
    useState('');

  const isLoggedIn = useGetIsLoggedIn();
  const { network } = useGetNetworkConfig();
  const completedTransactions = useGetSuccessfulTransactions();

  const fetchContractAddress = async (address: string) => {
    try {
      const { data } = await axios.get(
        `${network.apiAddress}/transactions/${address}`
      );
      const rawTopic = data?.logs?.events[0]?.topics[0];
      const rawAddress = Buffer.from(rawTopic, 'base64').toString('hex');
      return Address.fromHex(rawAddress).bech32();
    } catch (err) {
      console.error(err);
    }
  };

  const getContractAddressAfterDeploy = async (sessionId: string) => {
    const currentTransactionHash =
      completedTransactions.successfulTransactions[sessionId]?.transactions[0]
        ?.hash;
    if (currentTransactionHash) {
      const foundContractAddress = await fetchContractAddress(
        currentTransactionHash
      );

      if (
        foundContractAddress &&
        foundContractAddress !== contractOrDeployerAddress
      ) {
        setContractOrDeployerAddress(foundContractAddress);
      }
    }
  };

  useEffect(() => {
    if (!sessionId || !isLoggedIn) {
      return;
    }

    getContractAddressAfterDeploy(sessionId);
  }, [
    sessionId,
    isLoggedIn,
    completedTransactions.successfulTransactions[sessionId]?.status
  ]);

  return {
    contractOrDeployerAddress,
    setContractOrDeployerAddress
  };
};
