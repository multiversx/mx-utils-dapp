import * as React from 'react';
import { addressIsValid } from '@elrondnetwork/dapp-core/utils';
import { Address } from '@elrondnetwork/erdjs/out';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const BechToHexAddress = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Bech32 address required.')
      .test('address-is-valid', 'Invalid address.', (value) => {
        return value ? addressIsValid(value) : false;
      })
  });
  const computeResult = (addressInput: string) => {
    return new Address(addressInput).hex();
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert from Bech32 address to Hex address'
        label='Bech32 address'
      />
    </>
  );
};

export default BechToHexAddress;
