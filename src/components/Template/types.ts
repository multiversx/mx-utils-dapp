import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { RouteType } from 'routes';
import { CategoryType as ConverterCategoryType } from 'pages/Converters/categories';

interface TemplatePropsTypes {
  children: JSX.Element | JSX.Element[];
}

interface NavigationType {
  path: string;
  categories?: ConverterCategoryType[];
  icon: IconDefinition;
}

interface ItemType extends RouteType {
  categories?: ConverterCategoryType[];
  icon: IconDefinition;
}

export type { TemplatePropsTypes, NavigationType, ItemType };
