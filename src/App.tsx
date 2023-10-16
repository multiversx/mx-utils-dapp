import React from 'react';
import { TransactionsToastList } from '@multiversx/sdk-dapp/UI/TransactionsToastList';
import {SignTransactionsModals} from "@multiversx/sdk-dapp/UI/SignTransactionsModals/SignTransactionsModals";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { ContextProvider } from 'context';
import { Page404 } from 'pages/Page404';
import { routes } from 'routes';

import type { RouteType } from 'routes';

import 'assets/sass/theme.scss';

/*
 * Handle the component declaration.
 */

export const App = () => (
  <BrowserRouter>
    <ContextProvider>
      <TransactionsToastList />
      <SignTransactionsModals />
      <Routes>
        {routes.map((route: RouteType) => (
          <Route
            path={route.path}
            key={route.path}
            element={<route.component />}
          />
        ))}

        <Route path='*' element={<Page404 />} />
      </Routes>
    </ContextProvider>
  </BrowserRouter>
);
