import { ComponentType } from 'react';

import { dAppName } from 'config';
import Converters from 'pages/Converters';

import withPageTitle from './components/PageTitle';

export interface RouteType {
  path: string;
  title: string;
  component: ComponentType;
}

export const routes: RouteType[] = [
  {
    path: '/home',
    title: 'Home',
    component: Converters
  },
  {
    path: '/converters',
    title: 'Converters',
    component: Converters
  }
];

export default routes.map((route) => {
  const title = route.title
    ? `${route.title} • Elrond ${dAppName}`
    : `Elrond ${dAppName}`;

  return {
    path: route.path,
    title: route.title,
    component: withPageTitle(title, route.component)
  };
});
