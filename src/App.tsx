import { Fragment } from 'react';
import { TransactionsToastList } from '@multiversx/sdk-dapp/UI/TransactionsToastList';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types/enums.types';
import { DappProvider } from '@multiversx/sdk-dapp/wrappers';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { ContextProvider } from 'context';
import { Layout } from 'components/Layout';
import { Page404 } from 'pages/Page404';
import { routes } from 'routes';

import type { RouteType } from 'routes';

/*
 * Handle the component declaration.
 */

export const App = () => (
  <BrowserRouter>
    <DappProvider
      environment={EnvironmentsEnum.mainnet}
      customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
    >
      <Fragment>
        <TransactionsToastList />
        <ContextProvider>
          <Layout>
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
          </Layout>
        </ContextProvider>
      </Fragment>
    </DappProvider>
  </BrowserRouter>
);
