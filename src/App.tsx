import { EnvironmentsEnum } from '@elrondnetwork/dapp-core/types';
import { DappProvider } from '@elrondnetwork/dapp-core/wrappers';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { ContextProvider } from 'context';
import { Layout } from 'components/Layout';
import routes from 'routes';
import Page404 from 'pages/Page404';

const App = () => (
  <Router>
    <DappProvider
      environment={EnvironmentsEnum.devnet}
      customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
    >
      <ContextProvider>
        <Layout>
          <Routes>
            {routes.map((route: any, index: number) => (
              <Route path={route.path} key={'route-key-' + index} element={<route.component />} />
            ))}

            <Route path='*' element={<Page404 />} />
          </Routes>
        </Layout>
      </ContextProvider>
    </DappProvider>
  </Router>
);

export default App;
