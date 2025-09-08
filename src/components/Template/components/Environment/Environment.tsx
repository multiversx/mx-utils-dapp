import { useCallback } from 'react';
import {
  faArrowDownLong,
  faArrowUpLong
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import Select, { components, SingleValue } from 'react-select';
import { useDispatch } from 'context';
import { ActionTypeEnum } from 'context/reducer';
import { useChain } from 'hooks/useChain';
import {
  EnvironmentsEnum,
  fallbackNetworkConfigurations,
  getDefaultNativeAuthConfig,
  initializeNetwork,
  refreshNativeAuthTokenLogin,
  setNativeAuthConfig,
  useGetIsLoggedIn
} from 'lib';
import { GENERATED_TOKEN_CHAIN, PERSISTED_NETWORK_KEY } from 'localConstants';
import styles from './styles.module.scss';
import type { OptionType } from './types';
import { useSignMessage } from './hooks/useSignMessage';

const customComponents = {
  Control: (props: any) => (
    <components.Control {...props} className={styles.control} />
  ),
  ValueContainer: (props: any) => (
    <components.ValueContainer {...props} className={styles.container} />
  ),
  SingleValue: (props: any) => (
    <components.SingleValue {...props} className={styles.value} />
  ),
  IndicatorsContainer: (props: any) => (
    <FontAwesomeIcon
      className={styles.indicator}
      icon={props.selectProps.menuIsOpen ? faArrowUpLong : faArrowDownLong}
    />
  ),
  Menu: (props: any) => <components.Menu {...props} className={styles.menu} />,
  MenuList: (props: any) => (
    <components.MenuList {...props} className={styles.list} />
  ),
  Option: (props: any) => (
    <components.Option
      {...props}
      className={classNames(styles.option, {
        [styles.selected]: props.isSelected
      })}
    />
  ),
  IndicatorSeparator: null
};

export const Environment = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { chain } = useChain();
  const dispatch = useDispatch();

  const signMessage = useSignMessage();

  const options: OptionType[] = Object.values(EnvironmentsEnum).map(
    (chain) => ({
      label: chain,
      value: chain
    })
  );

  const onChange = useCallback(
    async (option: SingleValue<OptionType>) => {
      if (option) {
        const chainNetworkConfig = fallbackNetworkConfigurations[option.value];
        const { apiAddress } = await initializeNetwork({
          environment: option.value,
          customNetworkConfig: {
            ...chainNetworkConfig,
            skipFetchFromServer: false
          }
        });
        const nativeAuthConfig = getDefaultNativeAuthConfig({ apiAddress });
        setNativeAuthConfig(nativeAuthConfig);
        if (isLoggedIn) {
          await refreshNativeAuthTokenLogin({
            signMessageCallback: signMessage,
            nativeAuthClientConfig: {
              apiAddress
            }
          });
        }

        dispatch({
          type: ActionTypeEnum.switchDappEnvironment,
          dappEnvironment: option.value as EnvironmentsEnum
        });
        sessionStorage.setItem(
          PERSISTED_NETWORK_KEY,
          option.value as EnvironmentsEnum
        );
        sessionStorage.setItem(
          GENERATED_TOKEN_CHAIN,
          option.value as EnvironmentsEnum
        );

        navigate(pathname, { replace: true });
      }
    },
    [pathname, navigate, dispatch]
  );

  return (
    <div className={styles.environment}>
      <Select
        options={options.reverse()}
        value={{ label: chain, value: chain }}
        onChange={onChange}
        isSearchable={false}
        components={customComponents}
      />
    </div>
  );
};
