import { useNavigate } from 'react-router-dom';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { useChain } from 'hooks/useChain';
import { useLogout } from 'hooks/useLogout';
import { GENERATED_TOKEN_CHAIN } from 'localConstants';
import { routeNames } from 'routes';
import { useTokenActions } from './useTokenActions';

export const useInputActions = () => {
  const callbackRoute = useCallbackRoute();
  const navigate = useNavigate();
  const logout = useLogout();
  const { chain } = useChain();

  const { handleChange } = useTokenActions();

  const handleGenerateToken = async () => {
    sessionStorage.setItem(GENERATED_TOKEN_CHAIN, chain);

    await logout(routeNames.unlock, () => {
      navigate(`${routeNames.unlock}?callbackUrl=${callbackRoute}`);
    });
  };

  const handlePasteToken = () => {
    navigator.clipboard.readText().then((text) => {
      handleChange(text);
    });
  };

  return {
    handleGenerateToken,
    handlePasteToken,
  };
};
