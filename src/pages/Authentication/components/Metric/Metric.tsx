import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { fallbackNetworkConfigurations } from '@multiversx/sdk-dapp/constants';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import classNames from 'classnames';

import type { MetricItemType } from 'pages/Authentication/types';

import styles from './styles.module.scss';

export const Metric = (props: MetricItemType) => {
  const { subItem, name, colors, data, explorer, identifier, chain } = props;
  const [color] = colors;

  const code = colors.length > 1 ? String(data).split('.') : [String(data)];
  const link = chain
    ? `${fallbackNetworkConfigurations[chain].explorerAddress}${explorer}`
    : explorer;

  return (
    <div
      className={classNames(styles.metric, {
        [styles.submetric]: subItem
      })}
    >
      <div className={styles.name}>{name}</div>

      <div
        style={{ color: color }}
        className={classNames(styles.result, {
          [styles.wide]: Boolean(explorer),
          [styles.format]: identifier === 'extraInfo'
        })}
      >
        {data ? (
          <span className={styles.data}>
            {code.map((word: string, index: number) => (
              <Fragment key={word}>
                <span style={{ color: colors[index] }}>{word}</span>
                <span className={styles.dot}>.</span>
              </Fragment>
            ))}
          </span>
        ) : null}

        {Boolean(data) ? (
          <div className={styles.buttons}>
            {explorer && data ? (
              <a href={link} target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faSearch} className={styles.explorer} />
              </a>
            ) : null}

            {data ? (
              <CopyButton text={String(data) || ''} className={styles.copy} />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
