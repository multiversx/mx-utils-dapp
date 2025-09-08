import { useEffect, useRef, useState } from 'react';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { Template } from 'components/Template';
import { dAppConfig } from 'config';
import { ContextProvider } from 'context';
import { useChain } from 'hooks/useChain';
import { initApp, InitAppType, useGetNetworkConfig } from 'lib';
import { Page404 } from 'pages/Page404';
import { Unlock } from 'pages/Unlock/Unlock';
import { routeNames, routes } from 'routes';

import 'assets/sass/theme.scss';

/*
 * Handle the component declaration.
 */

const Main = () => {
  const { chain } = useChain();
  const { network } = useGetNetworkConfig();

  const [initialized, setInitialized] = useState<boolean>(false);

  const isMountingRef = useRef(false);

  const initializeApp = async () => {
    if ((isMountingRef.current && network.id === chain) || !chain) {
      return;
    }

    isMountingRef.current = true;
    const initConfig: InitAppType = {
      storage: { getStorageCallback: () => sessionStorage },
      dAppConfig: { ...dAppConfig, environment: chain }
    };

    try {
      await initApp(initConfig);
      setInitialized(true);
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  };

  useEffect(() => {
    initializeApp();
  }, [chain]);

  return (
    <>
      {!initialized ? <FontAwesomeIcon icon={faSpinner} spin /> : <RoutedApp />}
    </>
  );
};

const RoutedApp = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <>
      <Routes location={previousLocation || location}>
        <Route
          path='/'
          element={
            <Template fullWidth>
              <Outlet />
            </Template>
          }
        >
          {routes.map((route) => (
            <Route
              key={`route-key-${route.path}`}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
      {previousLocation && (
        <Routes>
          <Route path={routeNames.unlock} element={<Unlock />} />
        </Routes>
      )}
    </>
  );
};

export const App = () => (
  <BrowserRouter>
    <ContextProvider>
      <Main />
    </ContextProvider>
  </BrowserRouter>
);
