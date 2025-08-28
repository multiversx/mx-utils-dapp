import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProviderTypeEnum, UnlockPanelManager, useGetLoginInfo } from 'lib';
import { routeNames } from 'routes';

export const Unlock = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const callbackURL = searchParams.get('callbackUrl');
  const callbackRoute = callbackURL ?? routeNames.home.concat(search);
  const { isLoggedIn } = useGetLoginInfo();

  const allowedProviders = [
    ProviderTypeEnum.ledger,
    ProviderTypeEnum.webview,
    ProviderTypeEnum.extension,
    ProviderTypeEnum.crossWindow,
    ProviderTypeEnum.walletConnect
  ];

  const unlockPanelManager = UnlockPanelManager.init({
    loginHandler: () => {
      navigate(callbackRoute);
    },
    onClose: () => {
      navigate(routeNames.home);
    },
    allowedProviders
  });

  const handleOpenUnlockPanel = () => {
    unlockPanelManager.openUnlockPanel();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(callbackRoute);
      return;
    }

    handleOpenUnlockPanel();
  }, [isLoggedIn]);

  return null;
};
