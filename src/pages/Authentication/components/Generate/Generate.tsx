import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton
} from '@elrondnetwork/dapp-core/UI';
import { faArrowRight, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import { CloseIcon } from 'assets/img/CloseIcon';

import type { GeneratePropsType } from './types';

import styles from './styles.module.scss';

export const Generate = (props: GeneratePropsType) => {
  const { show, setShow } = props;

  const route = '/authentication';
  const buttons = [
    {
      name: 'Maiar DeFi Wallet',
      component: ExtensionLoginButton
    },
    {
      name: 'Maiar',
      component: WalletConnectLoginButton
    },
    {
      name: 'Ledger',
      component: LedgerLoginButton
    },
    {
      name: 'Elrond Web Wallet',
      component: WebWalletLoginButton
    }
  ];

  const navigate = useNavigate();
  const onLoginRedirect = () => {
    navigate(route, { replace: true });
  };

  const onClose = () => {
    navigate(route);
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
          <div className={styles.title}>Select Provider</div>

          <div className={styles.close} onClick={() => setShow(false)}>
            <CloseIcon />
          </div>
        </div>

        <div className={styles.warning}>
          <span className={styles.phishing}>
            <FontAwesomeIcon icon={faLock} className={styles.lock} />
            Scam/Phising verification:{' '}
            <span className={styles.highlighted}>https://</span>
            tools.multiversx.com
            <br />
            Check the website link carefully!
          </span>
        </div>

        <div className={styles.buttons}>
          {buttons.map((button) => (
            <button.component
              key={button.name}
              callbackRoute={route}
              onLoginRedirect={onLoginRedirect}
              className={styles.button}
              nativeAuth={true}
              {...button}
            >
              <span className={styles.name}>{button.name}</span>

              <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
            </button.component>
          ))}
        </div>
      </div>
    </Modal>
  );
};
