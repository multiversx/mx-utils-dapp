import { useGlobalContext } from 'context';

export const useChain = () => {
  const { dappEnvironment: chain } = useGlobalContext();

  console.log('chain', chain);

  return { chain };
};
