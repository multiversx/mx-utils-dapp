import { EnvironmentsEnum } from '@elrondnetwork/dapp-core/types/enums.types';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { ContextProvider } from 'context';
import Layout from 'components/Layout';
import Page404 from 'pages/Page404';
import routes from 'routes';

import type { RouteType } from 'routes';

/*
 * Handle the component declaration.
 */

const App = () => (
  <BrowserRouter>
    <DappProvider
      environment={EnvironmentsEnum.devnet}
      customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
    >
      <ContextProvider>
        <Layout>
          <Routes>
            {routes.map((route: RouteType) => (
              <Route path={route.path} key={route.path} element={<route.component />} />
            ))}

            <Route path='*' element={<Page404 />} />
          </Routes>
        </Layout>
      </ContextProvider>
    </DappProvider>
  </BrowserRouter>
);

export default App;
