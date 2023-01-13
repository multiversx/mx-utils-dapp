import type { ConverterType } from 'pages/Converters/components/Converter/types';

export interface CategoryType {
  name: string;
  identifier: string;
  converters: ConverterType[];
}
