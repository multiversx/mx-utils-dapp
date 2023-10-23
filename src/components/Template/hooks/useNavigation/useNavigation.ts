import {
  faArrowRightArrowLeft,
  faHome,
  faUser,
  faMessage,
  faFile,
  faRobot
} from '@fortawesome/free-solid-svg-icons';

import type { NavigationType } from './types';
import { routeNames } from 'routes';

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
    },
    {
      path: '/sign-message',
      icon: faMessage
    },
    {
      path: '/smart-contract',
      icon: faFile
    },
    {
      path: routeNames.explainer,
      icon: faRobot
    }
  ];

  /*
   * Return the given navigation, sent as an array, to a new Map instance for smoother retrieval, using get().
   */

  return {
    navigation: new Map(navigation.map((item) => [item.path, item]))
  };
};
