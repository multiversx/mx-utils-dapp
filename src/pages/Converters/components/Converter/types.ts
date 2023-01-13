import { TestFunction } from 'yup';

export interface ConverterType {
  title: string;
  label: string;
  compute: (value: string) => string;
  identifier: string;
  validate: {
    required: string;
    test?: {
      error: string;
      callback: TestFunction<string | undefined, Record<string, any>>;
    };
  };
}

export interface SubmitType {
  converter: string;
}
