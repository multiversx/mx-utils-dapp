import { useState } from 'react';

import { Template } from 'components/Template';

import { Input } from './components/Input';
import { Generate } from './components/Generate';
import { Metric } from './components/Metric';

import { TokenColorsEnum } from './enum';

import type { MetricItemType, MetricType } from './types';

import styles from './styles.module.scss';

export const emptyMetrics: MetricType = {
  address: '',
  blockHash: '',
  signature: '',
  body: '',
  host: '',
  ttl: 0,
  extraInfo: {}
};

export const defaultMetrics: MetricType = {
  address: 'erd1wjytfn6zhqfcsejvhwv7q4usazs5ryc3j8hc78fldgjnyct8wejqkasunc',
  blockHash: 'a71697208c89c1e020697574a48ec1666022872d70273e09c67a895f12ba407b',
  signature:
    '53121b33a2b1d95fe5a016588b8cdb3a17bfec55f2b39e977ff0c468dc0ceed53375344abb13c1f2ee819eef425c0a3f0202e9ced01bf195a74e9066e956da00',
  body: 'bG9jYWxob3N0.a71697208c89c1e020697574a48ec1666022872d70273e09c67a895f12ba407b.86400.eyJ0aW1lc3RhbXAiOjE2NzIyMzA1Mjh9',
  host: 'localhost',
  ttl: 86400,
  extraInfo: { timestamp: 1672230528 }
};

/*
 * Handle the component declaration.
 */

export const Authentication = () => {
  const [show, setShow] = useState(false);
  const [metrics, setMetrics] = useState<MetricType>(defaultMetrics);

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
      <Generate show={show} setShow={setShow} />

      <div className={styles.authentication}>
        <div className={styles.left}>
          <h2 className={styles.subtitle}>Encoded</h2>

          <Input setMetrics={setMetrics} setShow={setShow} />
        </div>

        <div className={styles.right}>
          <h2 className={styles.subtitle}>Decoded</h2>

          {metrics && (
            <div className={styles.metrics}>
              {metricItems.map((metric) => (
                <Metric key={metric.identifier} {...metric} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Template>
  );
};
