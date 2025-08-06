import {
  faArrowRightArrowLeft,
  faFile,
  faHome,
  faMessage,
  faRobot,
  faUser
} from '@fortawesome/free-solid-svg-icons';

import { routeNames } from 'routes';
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
