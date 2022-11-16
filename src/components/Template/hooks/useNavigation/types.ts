import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { CategoryType as ConverterCategoryType } from 'pages/Converters/hooks/useCategories/types';

export interface NavigationType {
  path: string;
  categories?: ConverterCategoryType[];
  icon: IconDefinition;
}
