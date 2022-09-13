import * as React from 'react';
import { stringIsFloat, stringIsInteger } from '@elrondnetwork/dapp-core/utils';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const Base64ToDecimal = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Hex required.')
      .test('address-is-valid', 'Invalid input.', (value) => {
        if (!value) return false;
        try {
          atob(value);
          if (!stringIsFloat(atob(value)) || !stringIsInteger(atob(value)))
            return false;
          return true;
        } catch (error) {
          return false;
        }
      })
  });
  const computeResult = (base64Value: string) => {
    const buff = Buffer.from(base64Value, 'base64');
    return buff.toString('ascii');
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert base64 to decimal'
        label='Base64 value'
      />
    </>
  );
};

export default Base64ToDecimal;
