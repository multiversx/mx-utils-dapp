import React, { useCallback } from 'react';
import Select, { components, SingleValue } from 'react-select';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownLong,
  faArrowUpLong
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import type { OptionType } from './types';
import styles from './styles.module.scss';
import { ActionTypeEnum } from 'context/reducer';
import { useDispatch } from 'context';
import { NETWORK } from 'constants/environment';
import { useChain } from 'hooks/useChain';

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
  const navigate = useNavigate();
  const { search } = useLocation();
  const { pathname } = useLocation();

  const { chain } = useChain();
  const dispatch = useDispatch();

  const options: OptionType[] = Object.values(EnvironmentsEnum).map(
    (chain) => ({
      label: chain,
      value: chain
    })
  );

  const onChange = useCallback(
    async (option: SingleValue<OptionType>) => {
      if (option) {
        dispatch({
          type: ActionTypeEnum.switchDappEnvironment,
          dappEnvironment: option.value as EnvironmentsEnum
        });

        const params = new URLSearchParams(search);
        params.set(NETWORK, option.value);

        navigate(`${pathname}?${params.toString()}`);
      }
    },
    [pathname, navigate, search, dispatch, chain]
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
