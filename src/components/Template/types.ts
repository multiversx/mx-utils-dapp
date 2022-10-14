import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { RouteType } from 'routes';
import { CategoryType as ConverterCategoryType } from 'pages/Converters/categories';

interface NavigationType {
  path: string;
  categories?: ConverterCategoryType[];
  icon: IconDefinition;
}

interface ItemType extends RouteType {
  categories?: ConverterCategoryType[];
  icon: IconDefinition;
}

export type { NavigationType, ItemType };
