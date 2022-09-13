import * as React from 'react';
import { stringIsInteger } from '@elrondnetwork/dapp-core/utils';
import BigNumber from 'bignumber.js';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const HexToDecimal = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Hex required.')
      .test('address-is-valid', 'Invalid input.', (value) => {
        return value ? new BigNumber(value, 16).toString(10) !== 'NaN' : false;
      })
  });
  const computeResult = (hexValue: string) => {
    const bn = new BigNumber(hexValue, 16);
    return bn.toString(10);
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert hexadecimal to decimal'
        label='Hex value'
      />
    </>
  );
};

export default HexToDecimal;
