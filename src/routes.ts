import { ComponentType } from 'react';

import { application } from 'config';
import { Converters } from 'pages/Converters';
import { Home } from 'pages/Home';

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
    ? `${route.title} • Elrond ${application}`
    : `Elrond ${application}`;

  return {
    path: route.path,
    title: route.title,
    component: withPageTitle(title, route.component)
  };
});
