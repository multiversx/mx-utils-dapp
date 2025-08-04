import { PropsWithChildren, ReactNode } from 'react';
import { IframeLoginTypes } from '@multiversx/sdk-web-wallet-iframe-provider/out/constants';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import styles from './styles.module.scss';

export interface IframeLoginButtonPropsType extends PropsWithChildren {
  children?: ReactNode;
  className?: string;
  buttonClassName?: string;
  loginButtonText?: string;
  disabled?: boolean;
  loginType?: IframeLoginTypes;
  onClick?: () => void;
}

export const IframeButton = ({
  className,
  disabled,
  children,
  onClick
}: IframeLoginButtonPropsType) => {
  return (
    <Button
      onClick={onClick}
      className={classNames(className, styles.iframeLoginButton)}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
