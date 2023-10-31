import type { ComponentType } from 'react';

import { applicationName } from 'config';

import { Authentication } from 'pages/Authentication';
import { Converters } from 'pages/Converters';
import { Home } from 'pages/Home';
import { SignMessage } from 'pages/SignMessage';
import { SmartContractInteraction } from 'pages/SmartContractInteraction/SmartContractInteraction';
import { Unlock } from 'pages/Unlock/Unlock';

import { withPageTitle } from './components/PageTitle';
import { Explainer } from 'pages/Explainer';

export interface RouteType {
  path: string;
  title: string;
  component: ComponentType;
}

export const routeNames = {
  home: '/',
  converters: '/converters',
  auth: '/auth',
  signMessage: '/sign-message',
  smartContract: '/smart-contract',
  unlock: '/unlock',
  explainer: '/explainer'
};

const pages: RouteType[] = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.converters,
    title: 'Converters',
    component: Converters
  },
  {
    path: routeNames.auth,
    title: 'Native Auth',
    component: Authentication
  },
  {
    path: routeNames.signMessage,
    title: 'Sign Message',
    component: SignMessage
  },
  {
    path: routeNames.smartContract,
    title: 'SC Deploy (BETA)',
    component: SmartContractInteraction
  },
  {
    path: routeNames.unlock,
    title: 'Unlock',
    component: Unlock
  },
  {
    path: routeNames.explainer,
    title: 'Explainer',
    component: Explainer
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
