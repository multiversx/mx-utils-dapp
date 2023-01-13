import { ReactNode, useState } from 'react';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from '@multiversx/sdk-dapp/UI';
import { faArrowRight, faLock } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import { CloseIcon } from 'assets/img/CloseIcon';

import type { GeneratePropsType } from './types';

import styles from './styles.module.scss';

enum LoginContainersTypesEnum {
  walletConnect = 'walletConnect',
  ledger = 'ledger',
  none = 'none'
}

export const Generate = (props: GeneratePropsType) => {
  const { show, setShow } = props;

  const [openedLoginContainerType, setOpenedContainerType] = useState(
    LoginContainersTypesEnum.none
  );

  function renderLoginButton(
    content: ReactNode,
    containerType = LoginContainersTypesEnum.none
  ) {
    const shouldRender =
      openedLoginContainerType === LoginContainersTypesEnum.none ||
      containerType === openedLoginContainerType;
    return shouldRender ? content : null;
  }

  const route = '/auth';
  const buttons = [
    {
      name: 'DeFi Wallet',
      component: ExtensionLoginButton
    },
    {
      name: 'xPortal Mobile Wallet',
      component: WalletConnectLoginButton,
      id: LoginContainersTypesEnum.walletConnect,
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
      component: WebWalletLoginButton
    }
  ];

  const navigate = useNavigate();
  const onLoginRedirect = () => {
    navigate(route, { replace: true });
  };

  const onClose = () => {
    navigate(route);
    setShow(false);
    setOpenedContainerType(LoginContainersTypesEnum.none);
  };

  const titles = {
    [LoginContainersTypesEnum.none]: 'Select Provider',
    [LoginContainersTypesEnum.ledger]: 'Login with Ledger',
    [LoginContainersTypesEnum.walletConnect]: 'Login with Maiar'
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

        <div className={styles.warning}>
          <span className={styles.phishing}>
            <FontAwesomeIcon icon={faLock} className={styles.lock} />
            Scam/Phising verification:{' '}
            <span className={styles.highlighted}>https://</span>
            utils.multiversx.com
            <br />
            Check the website link carefully!
          </span>
        </div>

        <div className={styles.buttons}>
          {buttons.map((button) =>
            renderLoginButton(
              <button.component
                key={button.name}
                callbackRoute={route}
                onLoginRedirect={onLoginRedirect}
                className={styles.button}
                wrapContentInsideModal={false}
                hideButtonWhenModalOpens={true}
                nativeAuth={true}
                {...button}
              >
                <span className={styles.name}>{button.name}</span>

                <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
              </button.component>,
              button.id
            )
          )}
        </div>
      </div>
    </Modal>
  );
};