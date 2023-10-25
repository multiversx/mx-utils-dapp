import { DefaultMetricType, MetricType } from '../types';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';

export const emptyMetrics: MetricType = {
  address: '',
  blockHash: '',
  signature: '',
  body: '',
  host: '',
  ttl: 0,
  extraInfo: {}
};

export const DEFAULT_METRICS: DefaultMetricType = {
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
