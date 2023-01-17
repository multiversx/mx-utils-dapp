import { useState } from 'react';
import { getChainID } from '@multiversx/sdk-dapp/utils/network';
import { getEnvironmentForChainId } from '@multiversx/sdk-dapp/apiCalls/configuration/getEnvironmentForChainId';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import { useLocation } from 'react-router-dom';

import { Template } from 'components/Template';

import { Input } from './components/Input';
import { Metric } from './components/Metric';
import { Generate } from './components/Generate';
import { Environment } from './components/Environment';

import { TokenColorsEnum } from './enum';

import type { DefaultMetricType, MetricItemType, MetricType } from './types';

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

export const defaultMetrics: DefaultMetricType = {
  [EnvironmentsEnum.mainnet]: {
    address: 'erd1wjytfn6zhqfcsejvhwv7q4usazs5ryc3j8hc78fldgjnyct8wejqkasunc',
    blockHash:
      'd8b83005f4ccc794aaade8f815d0cb8bac555db66dbe9bbe8436c1e7ed4c6e46',
    signature:
      'a902ddd844a3a9c47f724b5fc65ff50370abd5298ed4207307e7113e273d3cb4501516a65f1ead3e1d7d10a9ea2554645e1e51b96826b649a3ce37c2528f1606',
    body: 'bG9jYWxob3N0.d8b83005f4ccc794aaade8f815d0cb8bac555db66dbe9bbe8436c1e7ed4c6e46.86400.eyJ0aW1lc3RhbXAiOjE2NzM5NTA0NDZ9',
    host: 'localhost',
    ttl: 86400,
    extraInfo: { timestamp: 1673950446 }
  },
  [EnvironmentsEnum.devnet]: {
    address: 'erd1wjytfn6zhqfcsejvhwv7q4usazs5ryc3j8hc78fldgjnyct8wejqkasunc',
    blockHash:
      '528f03ad9b068757209e767b16f17bca92c703c6bc146ab7120fa6ec72ed2a02',
    signature:
      'fa1cd80efc40effae33e7b0d6540476bd4309152a4642f9efd64335b7c3d0948f39f168893d18bc8712021a1456dd55034e89338a29c39f7d1b71471a0665205',
    body: 'bG9jYWxob3N0.528f03ad9b068757209e767b16f17bca92c703c6bc146ab7120fa6ec72ed2a02.86400.eyJ0aW1lc3RhbXAiOjE2NzM5NTA1Nzh9',
    host: 'localhost',
    ttl: 86400,
    extraInfo: { timestamp: 1673950578 }
  },
  [EnvironmentsEnum.testnet]: {
    address: 'erd1wjytfn6zhqfcsejvhwv7q4usazs5ryc3j8hc78fldgjnyct8wejqkasunc',
    blockHash:
      'a6454351a780a150e09c689e0536ca91ce478a2cba057dd6a64ebd2ebd7bba5b',
    signature:
      '3c2f1ed4deb9f01858ef6415c3b6ba90274395bcb26ab12764c59966909f30a81e2522d2aff33d48e3ba8f1b5f2f48ce62975465be64e43991e31b269cff1a0d',
    body: 'bG9jYWxob3N0.a6454351a780a150e09c689e0536ca91ce478a2cba057dd6a64ebd2ebd7bba5b.86400.eyJ0aW1lc3RhbXAiOjE2NzM5NTA2ODB9',
    host: 'localhost',
    ttl: 86400,
    extraInfo: { timestamp: 1673950680 }
  }
};

/*
 * Handle the component declaration.
 */

export const Authentication = () => {
  const location = useLocation();
  const entries = Object.fromEntries(new URLSearchParams(location.search));
  const network = entries.network as EnvironmentsEnum;

  const [chain, setChain] = useState<EnvironmentsEnum>(
    network || getEnvironmentForChainId(getChainID())
  );

  const [show, setShow] = useState(false);
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
      <Generate show={show} setShow={setShow} chain={chain} />

      <div className={styles.authentication}>
        <div className={styles.left}>
          <h2 className={styles.subtitle}>Encoded</h2>

          <Input setMetrics={setMetrics} setShow={setShow} chain={chain} />
        </div>

        <div className={styles.right}>
          <h2 className={styles.subtitle}>
            <span>Decoded</span>

            <Environment
              chain={chain}
              setChain={setChain}
              setMetrics={setMetrics}
            />
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
