import * as React from 'react';
import { stringIsInteger } from '@elrondnetwork/dapp-core/utils';
import BigNumber from 'bignumber.js';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const DecimalToHex = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Integer required.')
      .test('address-is-valid', 'Not an integer.', (value) => {
        return value ? stringIsInteger(value) : false;
      })
  });
  const computeResult = (intValue: string) => {
    const bn = new BigNumber(intValue, 10);
    let bnStr = bn.toString(16);
    if (bnStr.length % 2 != 0) {
      bnStr = '0' + bnStr;
    }
    return bnStr;
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert decimal to hexadecimal'
        label='Numeric value'
      />
    </>
  );
};

export default DecimalToHex;
