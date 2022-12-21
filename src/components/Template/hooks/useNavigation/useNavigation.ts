import {
  faArrowRightArrowLeft,
  faHome,
  faUser
} from '@fortawesome/free-solid-svg-icons';

import { useCategories } from 'pages/Converters/hooks/useCategories';

import type { NavigationType } from './types';

/*
 * Handle the custom hook declaration.
 */

export const useNavigation = () => {
  const data = useCategories();
  const navigation: NavigationType[] = [
    {
      path: '/',
      icon: faHome
    },
    {
      path: '/converters',
      categories: data.categories,
      icon: faArrowRightArrowLeft
    },
    {
      path: '/authentication',
      icon: faUser
    }
  ];

  /*
   * Return the given navigation, sent as an array, to a new Map instance for smoother retrieval, using get().
   */

  return {
    navigation: new Map(navigation.map((item) => [item.path, item]))
  };
};
