import { useGlobalContext } from 'context';

export const useChain = () => {
  const { dappEnvironment: chain } = useGlobalContext();
  return { chain };
};
