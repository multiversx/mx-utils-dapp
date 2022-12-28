import type { MetricItemType } from 'pages/Authentication/types';

import { CopyButton } from '@elrondnetwork/dapp-core/UI/CopyButton';
import { ExplorerLink } from '@elrondnetwork/dapp-core/UI/ExplorerLink';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { Fragment } from 'react';

export const Metric = (props: MetricItemType) => {
  const { subItem, name, colors, data, explorer, identifier } = props;
  const [color] = colors;

  const code = colors.length > 1 ? String(data).split('.') : [String(data)];

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
              <ExplorerLink page={explorer} className={styles.explorer} />
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
