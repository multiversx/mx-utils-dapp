import type { Code } from '@multiversx/sdk-core';
import type { TypedValue } from '@multiversx/sdk-core';

export type CodeMetadataType = {
  upgradeable?: boolean;
  readable?: boolean;
  payable?: boolean;
  payableBySc?: boolean;
};

export type DeployOrUpgradeParamsType = {
  address?: string;
  code: Code;
  args: TypedValue[];
  gasLimit: number;
} & CodeMetadataType;
