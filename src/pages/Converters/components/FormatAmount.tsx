import * as React from 'react';
import { stringIsInteger } from '@elrondnetwork/dapp-core/utils';
import { formatAmount } from '@elrondnetwork/dapp-core/utils/operations/formatAmount';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const FormatAmount = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Hex required.')
      .test('address-is-valid', 'Invalid input.', (value) => {
        return value ? stringIsInteger(value) : false;
      })
  });
  const computeResult = (intValue: string) => {
    return formatAmount({
      input: intValue,
      showLastNonZeroDecimal: true
    });
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Format amount (nominate)'
        label='Integer value'
      />
    </>
  );
};

export default FormatAmount;
