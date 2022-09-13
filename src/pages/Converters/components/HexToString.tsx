import * as React from 'react';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const HexToString = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Bech32 address required.')
      .test('address-is-valid', 'Invalid input.', (value) => {
        if (!value) return false;
        const a = parseInt(value, 16);
        return a.toString(16) === value;
      })
  });
  const computeResult = (input: string) => {
    return Buffer.from(input, 'hex').toString('utf8');
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert hexadecimal encoded string to string'
        label='Hex value'
      />
    </>
  );
};

export default HexToString;
