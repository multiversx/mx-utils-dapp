import * as React from 'react';
import { Address } from '@elrondnetwork/erdjs/out';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const HexToBechAddress = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string()
      .required('Hex address required.')
      .test('address-is-valid', 'Invalid address.', (value) => {
        if (!value) return false;
        try {
          Address.fromHex(value);
          return true;
        } catch (err) {
          return false;
        }
      })
  });

  const computeResult = (addressInput: string) => {
    return Address.fromHex(addressInput).bech32();
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert from Hex address to Bech32 address'
        label='Hex address'
      />
    </>
  );
};

export default HexToBechAddress;
