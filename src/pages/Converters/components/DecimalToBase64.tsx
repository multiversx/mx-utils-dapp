import * as React from 'react';
import { stringIsFloat, stringIsInteger } from '@elrondnetwork/dapp-core/utils';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const DecimalToBase64 = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Hex required.')
      .test('address-is-valid', 'Invalid input.', (value) => {
        return value ? stringIsInteger(value) || stringIsFloat(value) : false;
      })
  });
  const computeResult = (decimalValue: string) => {
    const buff = Buffer.from(decimalValue, 'ascii');
    return buff.toString('base64');
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert decimal to base64'
        label='Numeric value'
      />
    </>
  );
};

export default DecimalToBase64;
