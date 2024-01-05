import { useGetLoginInfo, useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { ScExplorerContainer } from '@multiversx/sdk-dapp-sc-explorer/containers/ScExplorerContainer';
import { VerifiedContractTabsEnum } from '@multiversx/sdk-dapp-sc-explorer/types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobalContext } from 'context';
import { useCallbackRoute } from 'hooks/useCallbackRoute';
import { routeNames } from 'routes';
import styles from './styles.module.scss';

const customClassNames = {
  badgePrimaryClassName: 'badge-outline badge-outline-primary-alt',
  badgeSecondaryClassName: 'badge-outline badge-outline-grey',
  badgeFilledClassName: 'badge-filled',
  buttonClassName: styles?.button,
  buttonSecondaryClassName: styles?.buttonSecondary,
  inputClassName: styles?.field,
  inputGroupClassName: styles?.fieldgroup,
  inputGroupAppendClassName: styles?.fieldgroupappend,
  selectClassName: styles?.field,
};

export const SmartContractInteraction = () => {
  const { dappEnvironment } = useGlobalContext();
  const { isLoggedIn } = useGetLoginInfo();
  const callbackRoute = useCallbackRoute();
  const navigate = useNavigate();
  const location = useLocation();

  const onLoginClick = () => {
    if (isLoggedIn) {
      return;
    } else {
      navigate(`${routeNames.unlock}?callbackUrl=${callbackRoute}`, {
        state: { previousLocation: location },
      });
    }
  };

  return (
    <div className={styles?.container}>
      <ScExplorerContainer
        smartContract={{
          canMutate: true,
          canLoadAbi: true,
          canDeploy: true,
          canUpgrade: true,
        }}
        accountConsumerHandlers={{
          useGetLoginInfo,
          useGetAccountInfo,
          onLoginClick,
        }}
        networkConfig={{ environment: dappEnvironment }}
        customClassNames={customClassNames}
        className='mx-sdk-sc'
        activeSection={VerifiedContractTabsEnum.loadAbi}
      />
    </div>
  );
};
