import React, { useCallback } from 'react';
import Select, { components } from 'react-select';

import type { EnvironmentPropsType, OptionType } from './types';

import styles from './styles.module.scss';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { useLocation, useNavigate } from 'react-router-dom';

export const Option = (props: any) => {
  return (
    <div className={`token-option ${props.isSelected ? 'is-selected' : ''}`}>
      <components.Option {...props} />
    </div>
  );
};

export const Environment = (props: EnvironmentPropsType) => {
  const navigate = useNavigate();

  const { chain, setChain } = props;
  const { pathname } = useLocation();

  const options: OptionType[] = Object.values(EnvironmentsEnum).map(
    (chain) => ({
      label: chain,
      value: chain
    })
  );

  const onChange = useCallback(
    (option: OptionType | null) => {
      if (option) {
        setChain(option.value as EnvironmentsEnum);
        navigate(`${pathname}?network=${option.value}`);
      }
    },
    [setChain, pathname, navigate]
  );

  return (
    <div className={styles.environment}>
      <Select
        options={options.reverse()}
        defaultValue={{ label: chain, value: chain }}
        onChange={onChange}
        components={{ Option }}
      />
    </div>
  );
};
