import type { ComponentType } from 'react';

import { applicationName } from 'config';

import { Authentication } from 'pages/Authentication';
import { Converters } from 'pages/Converters';
import { Home } from 'pages/Home';
import { SignMessage } from 'pages/SignMessage';

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
  },
  {
    path: '/auth',
    title: 'Native Auth',
    component: Authentication
  },
  {
    path: '/sign-message',
    title: 'Sign Message',
    component: SignMessage
  }
];

export const routes = pages.map((page) => {
  const title = page.title
    ? `${page.title} • MultiversX ${applicationName}`
    : `MultiversX ${applicationName}`;

  return Object.assign(page, {
    component: withPageTitle(title, page.component)
  });
});
