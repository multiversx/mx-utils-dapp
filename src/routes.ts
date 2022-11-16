import type { ComponentType } from 'react';

import { applicationName } from 'config';
import { Converters } from 'pages/Converters';
import { Home } from 'pages/Home';

import { withPageTitle } from './components/PageTitle';

export interface RouteType {
  path: string;
  title: string;
  component: ComponentType;
}

const pages: RouteType[] = [
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

export const routes = pages.map((page) => {
  const title = page.title
    ? `${page.title} • Elrond ${applicationName}`
    : `Elrond ${applicationName}`;

  return Object.assign(page, {
    component: withPageTitle(title, page.component)
  });
});
