import { ReactNode, useEffect, useState } from 'react';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from '@multiversx/sdk-dapp/UI';
import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants/network';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import { CloseIcon } from 'assets/img/CloseIcon';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

import type { GeneratePropsType } from './types';

import styles from './styles.module.scss';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';

enum LoginContainersTypesEnum {
  walletConnect = 'walletConnect',
  ledger = 'ledger',
  none = 'none'
}

export const Generate = (props: GeneratePropsType) => {
  const {
    chain = EnvironmentsEnum.mainnet,
    show,
    setShow,
    callbackAfterLogin
  } = props;
  const isLoggedIn = useGetIsLoggedIn();
  const { search, pathname } = useLocation();
  const { network } = Object.fromEntries(new URLSearchParams(search));

  const apiAddress = fallbackNetworkConfigurations[chain].apiAddress;
  const route = network ? `${pathname}?network=${network}` : pathname;

  const [openedLoginContainerType, setOpenedContainerType] = useState(
    LoginContainersTypesEnum.none
  );

  useEffect(() => {
    if (isLoggedIn && callbackAfterLogin) {
      callbackAfterLogin();
      onClose();
    }
  }, [isLoggedIn]);

  function renderLoginButton(
    content: ReactNode,
    containerType = LoginContainersTypesEnum.none
  ) {
    const shouldRender =
      openedLoginContainerType === LoginContainersTypesEnum.none ||
      containerType === openedLoginContainerType;
    return shouldRender ? content : null;
  }

  const buttons = [
    {
      name: 'MultiversX DeFi Wallet',
      component: ExtensionLoginButton
    },
    {
      name: 'xPortal Mobile Wallet',
      component: WalletConnectLoginButton,
      id: LoginContainersTypesEnum.walletConnect,
      isWalletConnectV2: true,
      onModalOpens: () =>
        setOpenedContainerType(LoginContainersTypesEnum.walletConnect)
    },
    {
      name: 'Ledger',
      id: LoginContainersTypesEnum.ledger,
      component: LedgerLoginButton,
      onModalOpens: () =>
        setOpenedContainerType(LoginContainersTypesEnum.ledger)
    },
    {
      name: 'MultiversX Web Wallet',
      component: WebWalletLoginButton,
      disableDefaultBehavior: Boolean(callbackAfterLogin)
    }
  ];

  const navigate = useNavigate();
  const onClose = () => {
    navigate(route);
    setShow(false);
    setOpenedContainerType(LoginContainersTypesEnum.none);
  };

  const titles = {
    [LoginContainersTypesEnum.none]: 'Select Provider',
    [LoginContainersTypesEnum.ledger]: 'Login with Ledger',
    [LoginContainersTypesEnum.walletConnect]: 'Login with xPortal'
  };

  return (
    <Modal
      show={show}
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
              button.disableDefaultBehavior ? (
                <button
                  onClick={callbackAfterLogin}
                  className={styles.button}
                  key={button.name}
                >
                  <span className={styles.name}>{button.name}</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className={styles.arrow}
                  />
                </button>
              ) : (
                <button.component
                  key={button.name}
                  callbackRoute={route}
                  className={styles.button}
                  wrapContentInsideModal={false}
                  hideButtonWhenModalOpens={true}
                  nativeAuth={{ apiAddress, expirySeconds: 7200 }}
                  {...button}
                >
                  <span className={styles.name}>{button.name}</span>

                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className={styles.arrow}
                  />
                </button.component>
              ),
              button.id
            )
          )}
        </div>
      </div>
    </Modal>
  );
};
