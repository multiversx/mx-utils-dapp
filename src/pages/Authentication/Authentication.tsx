import { useCallback, useState } from 'react';
import { CopyButton } from '@elrondnetwork/dapp-core/UI/CopyButton';

import { Template } from 'components/Template';

import { Input } from './components/Input';
import { Generate } from './components/Generate';

import { TokenColorsEnum } from './enum';

import type { MetricItemType, MetricType } from './types';

import styles from './styles.module.scss';

const defaultMetrics: MetricType = {
  address: '',
  blockHash: '',
  signature: '',
  body: '',
  host: '',
  ttl: 0
};

/*
 * Handle the component declaration.
 */

export const Authentication = () => {
  const [metrics, setMetrics] = useState<MetricType>(defaultMetrics);
  const [show, setShow] = useState(false);

  const metricItems: MetricItemType[] = [
    {
      name: 'Address',
      color: TokenColorsEnum.address,
      data: metrics ? metrics.address : undefined
    },
    {
      name: 'Body',
      color: TokenColorsEnum.body,
      data: metrics ? metrics.body : undefined
    },
    {
      name: 'Signature',
      color: TokenColorsEnum.signature,
      data: metrics ? metrics.signature : undefined
    },
    {
      name: 'Block Hash',
      color: TokenColorsEnum.body,
      data: metrics ? metrics.blockHash : undefined
    },
    {
      name: 'Time to live (seconds)',
      color: TokenColorsEnum.body,
      data: metrics ? metrics.ttl : undefined
    }
  ];

  const onReset = useCallback(() => {
    setMetrics(defaultMetrics);
  }, []);

  /*
   * Return the rendered component.
   */

  return (
    <Template>
      <Generate show={show} setShow={setShow} />

      <div className={styles.authentication}>
        <div className={styles.left}>
          <h2 className={styles.subtitle}>
            Encoded
            <button onClick={() => setShow(true)} className={styles.generate}>
              Generate new token
            </button>
          </h2>

          <Input setMetrics={setMetrics} onReset={onReset} />
        </div>

        <div className={styles.right}>
          <h2 className={styles.subtitle}>Decoded</h2>

          {metrics && (
            <div className={styles.metrics}>
              {metricItems.map((metric) => (
                <div className={styles.metric} key={metric.name}>
                  <div className={styles.name}>{metric.name}</div>

                  <div
                    className={styles.result}
                    style={{ color: metric.color }}
                  >
                    <span>{metric.data}</span>

                    {metric.data ? (
                      <CopyButton
                        text={String(metric.data) || ''}
                        className={styles.copy}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Template>
  );
};
