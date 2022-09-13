import * as React from 'react';
import BigNumber from 'bignumber.js';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const Base64ToHex = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Hex required.')
      .test('address-is-valid', 'Invalid input.', (value) => {
        if (!value) return false;
        try {
          atob(value);
          return true;
        } catch (error) {
          return false;
        }
      })
  });
  const computeResult = (base64Value: string) => {
    return Buffer.from(base64Value, 'base64').toString('hex');
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert base64 encoded string to hex encoded string'
        label='Base64 string value'
      />
    </>
  );
};

export default Base64ToHex;
