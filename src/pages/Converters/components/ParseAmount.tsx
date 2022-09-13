import * as React from 'react';
import { stringIsFloat, stringIsInteger } from '@elrondnetwork/dapp-core/utils';
import { parseAmount } from '@elrondnetwork/dapp-core/utils/operations/parseAmount';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const ParseAmount = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Hex required.')
      .test('address-is-valid', 'Invalid input.', (value) => {
        return value ? stringIsInteger(value) || stringIsFloat(value) : false;
      })
  });
  const computeResult = (decimalValue: string) => {
    return parseAmount(decimalValue);
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Parse amount (denominate)'
        label='Decimal value'
      />
    </>
  );
};

export default ParseAmount;
