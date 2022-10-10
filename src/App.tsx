import React from 'react';
import { EnvironmentsEnum } from '@elrondnetwork/dapp-core/types';
import { NotificationModal } from '@elrondnetwork/dapp-core/UI';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Layout from 'components/Layout';
import { ContextProvider } from 'context';
import PageNotFound from 'pages/PageNotFound';
import routes from 'routes';

const App = () => (
  <Router>
    <DappProvider
      environment={EnvironmentsEnum.devnet}
      customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
    >
      <ContextProvider>
        <Layout>
          <NotificationModal />
          <Routes>
            {routes.map((route: any, index: number) => (
              <Route
                path={route.path}
                key={'route-key-' + index}
                element={<route.component />}
              />
            ))}
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Layout>
      </ContextProvider>
    </DappProvider>
  </Router>
);

export default App;
