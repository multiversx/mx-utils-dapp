import * as React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Card } from 'react-bootstrap';

type GenericConverterType = {
  converterInput: string;
};

type GenericConverterPropsType = {
  validationSchema: any;
  computeResult: any;
  title: string;
  label: string;
};

const GenericConverter = ({
  validationSchema,
  computeResult,
  title,
  label
}: GenericConverterPropsType) => {
  const [result, setResult] = React.useState('');
  const initialValues = {
    converterInput: ''
  };
  const handleSubmit = ({ converterInput }: GenericConverterType) => {
    console.log(converterInput);
    setResult(computeResult(converterInput));
  };

  return (
    <>
      <Card.Title className='text-success'>{title}</Card.Title>
      <Card.Text>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form>
              <div className='form-group'>
                <label>{label}</label>
                <Field
                  name='converterInput'
                  type='text'
                  className='form-control'
                />
                <ErrorMessage
                  name='converterInput'
                  component='div'
                  className='text-danger'
                />
              </div>

              <div className='form-group'>
                <button type='submit' className='btn btn-primary'>
                  Convert
                </button>
                {result && (
                  <button
                    onClick={() => {
                      setResult('');
                      resetForm();
                    }}
                    className='btn btn-primary ml-2'
                  >
                    Clear
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Card.Text>

      {result && (
        <Card>
          <Card.Header className='bg-success'>Result</Card.Header>
          <Card.Body>{result}</Card.Body>
        </Card>
      )}
    </>
  );
};

export default GenericConverter;
