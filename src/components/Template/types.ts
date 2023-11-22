import type { PropsWithChildren } from 'react';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { CategoryType as ConverterCategoryType } from 'pages/Converters/hooks/useCategories/types';
import type { RouteType } from 'routes';

export interface TemplateType extends PropsWithChildren {
  fullWidth?: boolean;
}
export interface ItemType extends RouteType {
  categories?: ConverterCategoryType[];
  icon: IconDefinition;
}
