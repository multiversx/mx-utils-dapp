import * as React from 'react';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const StringToBase64 = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string().required('Bech32 address required.')
  });
  const computeResult = (input: string) => {
    return Buffer.from(input, 'ascii').toString('base64');
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert string to base64'
        label='String value'
      />
    </>
  );
};

export default StringToBase64;
