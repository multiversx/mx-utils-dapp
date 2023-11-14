import { ReactNode, useEffect, useState } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton,
} from '@multiversx/sdk-dapp/UI';
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { CloseIcon } from 'assets/img/CloseIcon';
import { useChain } from 'hooks/useChain';
import { usePersistedState } from 'hooks/usePersistedState';
import { NATIVE_TOKEN_CHAIN } from 'localConstants';
import { EXPIRY_SECONDS } from 'localConstants/nativeAuth';
import { routeNames } from 'routes';
import styles from './styles.module.scss';

enum LoginContainersTypesEnum {
  walletConnect = 'walletConnect',
  ledger = 'ledger',
  none = 'none',
}

export const Unlock = () => {
  const { search } = useLocation();
  const isLoggedIn = useGetIsLoggedIn();
  const { chain } = useChain();
  const [, setNativeTokenChain] = usePersistedState({
    storage: sessionStorage,
    key: NATIVE_TOKEN_CHAIN,
    initialValue: '',
  });

  const searchParams = new URLSearchParams(search);
  const previousRoute = searchParams.get('callbackUrl') ?? `/${search}`;

  const callbackURL = searchParams.get('callbackUrl');
  const callbackRoute = callbackURL ?? routeNames.home.concat(search);

  const [openedLoginContainerType, setOpenedContainerType] = useState(
    LoginContainersTypesEnum.none,
  );

  const onLoginRedirect = () => {
    onClose();
  };

  function renderLoginButton(
    content: ReactNode,
    containerType = LoginContainersTypesEnum.none,
  ) {
    const shouldRender =
      openedLoginContainerType === LoginContainersTypesEnum.none ||
      containerType === openedLoginContainerType;
    return shouldRender ? content : null;
  }

  const buttons = [
    {
      name: 'MultiversX DeFi Wallet',
      component: ExtensionLoginButton,
    },
    {
      name: 'xPortal Mobile Wallet',
      component: WalletConnectLoginButton,
      id: LoginContainersTypesEnum.walletConnect,
      isWalletConnectV2: true,
      onModalOpens: () =>
        setOpenedContainerType(LoginContainersTypesEnum.walletConnect),
    },
    {
      name: 'Ledger',
      id: LoginContainersTypesEnum.ledger,
      component: LedgerLoginButton,
      onModalOpens: () =>
        setOpenedContainerType(LoginContainersTypesEnum.ledger),
    },
    {
      name: 'MultiversX Web Wallet',
      component: WebWalletLoginButton,
    },
  ];

  const navigate = useNavigate();
  const onClose = () => {
    navigate(previousRoute);
    setOpenedContainerType(LoginContainersTypesEnum.none);
  };

  const titles = {
    [LoginContainersTypesEnum.none]: 'Select Provider',
    [LoginContainersTypesEnum.ledger]: 'Login with Ledger',
    [LoginContainersTypesEnum.walletConnect]: 'Login with xPortal',
  };

  useEffect(() => {
    setNativeTokenChain(chain);

    if (isLoggedIn) {
      onClose();
    }
  }, [isLoggedIn, chain]);

  return (
    <Modal
      show={true}
      onHide={onClose}
      keyboard={false}
      backdrop='static'
      animation={false}
      centered={true}
      className={styles.modal}
      dialogClassName={styles.dialog}
    >
      <div className={styles.unlock}>
        <div className={styles.heading}>
          <div className={styles.title}>
            {titles[openedLoginContainerType] ||
              titles[LoginContainersTypesEnum.none]}
          </div>

          <div className={styles.close} onClick={onClose}>
            <CloseIcon />
          </div>
        </div>

        <div className={styles.buttons}>
          {buttons.map((button) =>
            renderLoginButton(
              <button.component
                key={button.name}
                callbackRoute={callbackRoute}
                className={styles.button}
                wrapContentInsideModal={false}
                hideButtonWhenModalOpens={true}
                nativeAuth={{ expirySeconds: EXPIRY_SECONDS }}
                onLoginRedirect={onLoginRedirect}
                {...button}
              >
                <span className={styles.name}>{button.name}</span>

                <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
              </button.component>,
              button.id,
            ),
          )}
        </div>
      </div>
    </Modal>
  );
};
