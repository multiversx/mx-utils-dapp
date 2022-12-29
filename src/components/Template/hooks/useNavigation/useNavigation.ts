import {
  faArrowRightArrowLeft,
  faHome,
  faUser
} from '@fortawesome/pro-regular-svg-icons';

import type { NavigationType } from './types';

/*
 * Handle the custom hook declaration.
 */

export const useNavigation = () => {
  const navigation: NavigationType[] = [
    {
      path: '/',
      icon: faHome
    },
    {
      path: '/converters',
      icon: faArrowRightArrowLeft
    },
    {
      path: '/auth',
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
