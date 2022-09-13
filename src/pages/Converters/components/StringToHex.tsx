import * as React from 'react';
import * as Yup from 'yup';
import GenericConverter from './GenericConverter';

const StringToHex = () => {
  const validationSchema = Yup.object().shape({
    converterInput: Yup.string().required('Hex required.')
  });
  const computeResult = (input: string) => {
    return Buffer.from(input, 'ascii').toString('hex');
  };

  return (
    <>
      <GenericConverter
        validationSchema={validationSchema}
        computeResult={computeResult}
        title='Convert string to hexadecimal encoded string'
        label='String value'
      />
    </>
  );
};

export default StringToHex;
