import { stringIsFloat } from '@multiversx/sdk-dapp/utils/validation/stringIsFloat';
import { addressIsValid } from '@multiversx/sdk-dapp/utils/account/addressIsValid';
import { stringIsInteger } from '@multiversx/sdk-dapp/utils/validation/stringIsInteger';
import { formatAmount } from '@multiversx/sdk-dapp/utils/operations/formatAmount';
import { parseAmount } from '@multiversx/sdk-dapp/utils/operations/parseAmount';
import { Address } from '@multiversx/sdk-core/out';
import BigNumber from 'bignumber.js';

import type { CategoryType } from './types';

/*
 * Handle the custom hook declaration.
 */

export const useCategories = () => {
  const categories: CategoryType[] = [
    {
      name: 'Addresses',
      identifier: 'addresses',
      converters: [
        {
          title: 'Convert a bech32 address to a hexadecimal address',
          label: 'Bech32 address',
          identifier: 'bech32-to-hexadecimal',
          compute: (address: string) => new Address(address).hex(),
          validate: {
            required: 'Bech32 address required.',
            test: {
              error: 'Value must be a bech32 address.',
              callback: (value: string | undefined) =>
                value ? addressIsValid(value) : false
            }
          }
        },
        {
          title: 'Convert a hexadecimal address to a bech32 address',
          label: 'Hexadecimal address',
          identifier: 'hexadecimal-to-bech32',
          compute: (address: string) => Address.fromHex(address).bech32(),
          validate: {
            required: 'Hexadecimal address required.',
            test: {
              error: 'Value must be a hexadecimal address.',
              callback: (value: string | undefined) => {
                if (!value) {
                  return false;
                }

                try {
                  Address.fromHex(value);
                  return true;
                } catch {
                  return false;
                }
              }
            }
          }
        }
      ]
    },
    {
      name: 'Numeric',
      identifier: 'numeric',
      converters: [
        {
          title: 'Convert a decimal to a hexadecimal',
          label: 'Decimal value',
          identifier: 'decimal-to-hexadecimal',
          compute: (value: string) => BigNumber(value, 10).toString(16),
          validate: {
            required: 'Decimal required.',
            test: {
              error: 'Value must be a decimal.',
              callback: (value: string | undefined) =>
                value ? stringIsInteger(value) : false
            }
          }
        },
        {
          title: 'Convert a hexadecimal to a decimal',
          label: 'Hexadecimal value',
          identifier: 'hexadecimal-to-decimal',
          compute: (value: string) => BigNumber(value, 16).toString(10),
          validate: {
            required: 'Hexadecimal required.',
            test: {
              error: 'Value must be a hexadecimal.',
              callback: (value: string | undefined) =>
                value ? BigNumber(value, 16).toString(10) !== 'NaN' : false
            }
          }
        },
        {
          title: 'Convert a decimal to base64',
          label: 'Decimal value',
          compute: (value: string) =>
            Buffer.from(value, 'ascii').toString('base64'),
          identifier: 'decimal-to-base64',
          validate: {
            required: 'Decimal required.',
            test: {
              error: 'Value must be a decimal.',
              callback: (value: string | undefined) =>
                value ? stringIsInteger(value) || stringIsFloat(value) : false
            }
          }
        },
        {
          title: 'Convert base64 to a decimal',
          label: 'Base64 value',
          compute: (value: string) =>
            Buffer.from(value, 'base64').toString('ascii'),
          identifier: 'base64-to-decimal',
          validate: {
            required: 'Base64 required.',
            test: {
              error: 'Value must be a base64 input.',
              callback: (value: string | undefined) => {
                if (!value) return false;

                try {
                  const parsed = atob(value);

                  if (!stringIsFloat(parsed) || !stringIsInteger(parsed)) {
                    return false;
                  }

                  return true;
                } catch {
                  return false;
                }
              }
            }
          }
        }
      ]
    },
    {
      name: 'Amounts Formatting',
      identifier: 'amounts-formatting',
      converters: [
        {
          title: 'Parse amount (denominate)',
          label: 'Numeric value',
          compute: parseAmount,
          identifier: 'decimal-to-integer',
          validate: {
            required: 'Numeric value required.',
            test: {
              error: 'Value must be an integer.',
              callback: (value: string | undefined) =>
                value ? stringIsInteger(value) || stringIsFloat(value) : false
            }
          }
        },
        {
          title: 'Format amount (nominate)',
          label: 'Denominated value',
          compute: (value: string) =>
            formatAmount({
              input: value,
              showLastNonZeroDecimal: true
            }),
          identifier: 'integer-to-decimal',
          validate: {
            required: 'Denominated value required.',
            test: {
              error: 'Value must be an integer.',
              callback: (value: string | undefined) =>
                value ? stringIsInteger(value) : false
            }
          }
        }
      ]
    },
    {
      name: 'String Converters',
      identifier: 'string-converters',
      converters: [
        {
          title: 'Convert a string to a hexadecimal encoded string',
          label: 'String value',
          compute: (value: string) =>
            Buffer.from(value, 'ascii').toString('hex'),
          identifier: 'string-to-hexadecimal',
          validate: {
            required: 'String required.'
          }
        },
        {
          title: 'Convert a hexadecimal encoded string to a string',
          label: 'Hexadecimal value',
          compute: (value: string) =>
            Buffer.from(value, 'hex').toString('utf8'),
          identifier: 'hexadecimal-to-string',
          validate: {
            required: 'Hexadecimal required.',
            test: {
              error: 'Value must be a hexadecimal.',
              callback: (value: string | undefined) =>
                value
                  ? Buffer.from(value, 'hex').length == value.length / 2 &&
                    /[0-9A-Fa-f]/g.test(value)
                  : false
            }
          }
        },
        {
          title: 'Convert a string to a base64 encoded string',
          label: 'String value',
          compute: (value: string) =>
            Buffer.from(value, 'ascii').toString('base64'),
          identifier: 'string-to-base64',
          validate: {
            required: 'String required.'
          }
        },
        {
          title: 'Convert a base64 encoded string to a string',
          label: 'Base64 value',
          compute: (value: string) =>
            Buffer.from(value, 'base64').toString('ascii'),
          identifier: 'base64-to-string',
          validate: {
            required: 'Base64 value required.',
            test: {
              error: 'Value must be a base64 value.',
              callback: (value: string | undefined) => {
                if (!value) return false;

                try {
                  atob(value);

                  return true;
                } catch {
                  return false;
                }
              }
            }
          }
        },
        {
          title: 'Convert a hexadecimal encoded string to base64',
          label: 'Hexadecimal value',
          compute: (value: string) =>
            Buffer.from(value, 'hex').toString('base64'),
          identifier: 'hexadecimal-to-base64',
          validate: {
            required: 'Hexadecimal required.',
            test: {
              error: 'Value must be a hexadecimal.',
              callback: (value: string | undefined) =>
                value ? parseInt(value, 16).toString(16) === value : false
            }
          }
        },
        {
          title:
            'Convert a base64 encoded string to hexadecimal encoded string.',
          label: 'Base64 value',
          compute: (value: string) =>
            Buffer.from(value, 'base64').toString('hex'),
          identifier: 'base64-to-hexadecimal',
          validate: {
            required: 'Base64 value required.',
            test: {
              error: 'Value must be a base64 input.',
              callback: (value: string | undefined) => {
                if (!value) return false;

                try {
                  atob(value);

                  return true;
                } catch {
                  return false;
                }
              }
            }
          }
        }
      ]
    }
  ];

  /*
   * Return the object with the categories array.
   */

  return { categories };
};
