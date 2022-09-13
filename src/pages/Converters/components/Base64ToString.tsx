import * as React from 'react';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const Base64ToString = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Bech32 address required.')
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
  const computeResult = (input: string) => {
    return Buffer.from(input, 'base64').toString('ascii');
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert base64 encoded string to string'
        label='Base64 string value'
      />
    </>
  );
};

export default Base64ToString;
