import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { CategoryType as ConverterCategoryType } from 'pages/Converters/hooks/useCategories/types';
import type { RouteType } from 'routes';

export interface NavigationType {
  path: string;
  categories?: ConverterCategoryType[];
  icon: IconDefinition;
}

export interface ItemType extends RouteType {
  categories?: ConverterCategoryType[];
  icon: IconDefinition;
}
