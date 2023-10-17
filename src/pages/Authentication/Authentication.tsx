import { useState } from 'react';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { Template } from 'components/Template';
import { Input } from './components/Input';
import { Metric } from './components/Metric';
import { TokenColorsEnum } from './enum';
import type { DefaultMetricType, MetricItemType, MetricType } from './types';
import styles from './styles.module.scss';
import { useChain } from 'hooks/useChain';

export const emptyMetrics: MetricType = {
  address: '',
  blockHash: '',
  signature: '',
  body: '',
  host: '',
  ttl: 0,
  extraInfo: {}
};

export const defaultMetrics: DefaultMetricType = {
  [EnvironmentsEnum.mainnet]: {
    address: 'erd1wjytfn6zhqfcsejvhwv7q4usazs5ryc3j8hc78fldgjnyct8wejqkasunc',
    blockHash:
      'f68177510756edce45eca84b94544a6eacdfa36e69dfd3b8f24c4010d1990751',
    signature:
      'a29dba3f0d2fb4712cb662bc8050c87bf9f0e7fd28f3c98efe0fda074be5b087bd75c075243e832c2985a9da044496b2cff3c852c8c963f9d3d840aed8799c07',
    body: 'bG9jYWxob3N0.f68177510756edce45eca84b94544a6eacdfa36e69dfd3b8f24c4010d1990751.300.eyJ0aW1lc3RhbXAiOjE2NzM5NzIyNDR9',
    host: 'localhost',
    ttl: 300,
    extraInfo: { timestamp: 1673972244 }
  },
  [EnvironmentsEnum.devnet]: {
    address: 'erd1wjytfn6zhqfcsejvhwv7q4usazs5ryc3j8hc78fldgjnyct8wejqkasunc',
    blockHash:
      '18bc982461d1b53c837a24de4b4623c2bb835867ea2e8df14365cf436dee1b23',
    signature:
      'f8d651eda06e82a894ff1dc9480a33aa1030b076dfd5983346eec6793381587b88c2daf770a10ac39f9911968c2f1d1304c0c7dd86a82bc79f07e89f873f7e02',
    body: 'bG9jYWxob3N0.18bc982461d1b53c837a24de4b4623c2bb835867ea2e8df14365cf436dee1b23.600.eyJ0aW1lc3RhbXAiOjE2NzM5NzIzNjR9',
    host: 'localhost',
    ttl: 600,
    extraInfo: { timestamp: 1673972364 }
  },
  [EnvironmentsEnum.testnet]: {
    address: 'erd1wjytfn6zhqfcsejvhwv7q4usazs5ryc3j8hc78fldgjnyct8wejqkasunc',
    blockHash:
      '7d7418279345fbf1b3e0054032d1c3e3b2324b98223cc6a825e76f4fbfd4a7dd',
    signature:
      '6912c4dddb58fbc8aa3ee210c9a6e6e66847abcd6eebe72fe5b5df02632598c9b568c3b3499eea3d62f321db7aab3e5e7fef293f8ae17aaa6042141bd6a23208',
    body: 'bG9jYWxob3N0.7d7418279345fbf1b3e0054032d1c3e3b2324b98223cc6a825e76f4fbfd4a7dd.900.eyJ0aW1lc3RhbXAiOjE2NzM5NzM5MDZ9',
    host: 'localhost',
    ttl: 900,
    extraInfo: { timestamp: 1673973906 }
  }
};

/*
 * Handle the component declaration.
 */

export const Authentication = () => {
  const { chain } = useChain();
  const [metrics, setMetrics] = useState<MetricType>(defaultMetrics[chain]);

  const metricItems: MetricItemType[] = [
    {
      name: 'Address',
      identifier: 'address',
      colors: [TokenColorsEnum.address],
      data: metrics ? metrics.address : undefined
    },
    {
      name: 'Body',
      identifier: 'body',
      colors: [
        TokenColorsEnum.host,
        TokenColorsEnum.blockHash,
        TokenColorsEnum.ttl,
        TokenColorsEnum.extra
      ],
      data: metrics ? metrics.body : undefined
    },
    {
      name: 'Host',
      identifier: 'host',
      colors: [TokenColorsEnum.host],
      data: metrics ? metrics.host : undefined,
      subItem: true
    },
    {
      name: 'Block Hash',
      identifier: 'blockHash',
      colors: [TokenColorsEnum.blockHash],
      data: metrics ? metrics.blockHash : undefined,
      explorer: metrics ? `/blocks/${metrics.blockHash}` : '',
      subItem: true
    },

    {
      name: 'Time to live (seconds)',
      identifier: 'ttl',
      colors: [TokenColorsEnum.ttl],
      data: metrics ? metrics.ttl : undefined,
      subItem: true
    },
    {
      name: 'Extra Info',
      identifier: 'extraInfo',
      colors: [TokenColorsEnum.extra],
      subItem: true,
      data:
        metrics && Object.keys(metrics.extraInfo || []).length > 0
          ? JSON.stringify(metrics.extraInfo, null, 2)
          : undefined
    },
    {
      name: 'Signature',
      identifier: 'signature',
      colors: [TokenColorsEnum.signature],
      data: metrics ? metrics.signature : undefined
    }
  ];

  /*
   * Return the rendered component.
   */

  return (
    <Template>
      <div className={styles.authentication}>
        <div className={styles.left}>
          <h2 className={styles.subtitle}>Encoded</h2>

          <Input setMetrics={setMetrics} />
        </div>

        <div className={styles.right}>
          <h2 className={styles.subtitle}>
            <span>Decoded</span>
          </h2>

          {metrics && (
            <div className={styles.metrics}>
              {metricItems.map((metric) => (
                <Metric key={metric.identifier} chain={chain} {...metric} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Template>
  );
};
