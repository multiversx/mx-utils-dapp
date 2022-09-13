import * as React from 'react';
import BigNumber from 'bignumber.js';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const HexToBase64 = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Hex required.')
      .test('address-is-valid', 'Invalid input.', (value) => {
        if (!value) return false;
        const a = parseInt(value, 16);
        return a.toString(16) === value;
      })
  });
  const computeResult = (hexValue: string) => {
    return Buffer.from(hexValue, 'hex').toString('base64');
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert hex string to base64'
        label='Hex string value'
      />
    </>
  );
};

export default HexToBase64;
