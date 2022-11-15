import { ComponentType } from 'react';

import { applicationName } from 'config';

import Converters from 'pages/Converters';
import Home from 'pages/Home';

import withPageTitle from './components/PageTitle';

export interface RouteType {
  path: string;
  title: string;
  component: ComponentType;
}

export const routes: RouteType[] = [
  {
    path: '/',
    title: 'Home',
    component: Home
  },
  {
    path: '/converters',
    title: 'Converters',
    component: Converters
  }
];

export default routes.map((route) => {
  const title = route.title
    ? `${route.title} • Elrond ${applicationName}`
    : `Elrond ${applicationName}`;

  return Object.assign(route, {
    component: withPageTitle(title, route.component)
  });
});
