import React, { JSX, useEffect, useRef, useState } from 'react';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { Template } from 'components/Template';
import { ContextProvider } from 'context';
import { useChain } from 'hooks/useChain';
import { initApp } from 'lib';
import { Page404 } from 'pages/Page404';
import { Unlock } from 'pages/Unlock/Unlock';
import { routeNames, routes } from 'routes';
import { config } from './config';
import 'assets/sass/theme.scss';

/*
 * Handle the component declaration.
 */

export const Main = () => {
  const [state, setState] = useState<{
    content: JSX.Element | null;
  }>({
    content: null
  });

  const { chain } = useChain();
  const isMountingRef = useRef(false);

  const initializeApp = async () => {
    if (isMountingRef.current) return;

    isMountingRef.current = true;
    const configuration = {
      ...config,
      dAppConfig: { ...config.dAppConfig, environment: chain }
    };

    await initApp(configuration);

    setState({
      content: <RoutedApp />
    });

    isMountingRef.current = false;
  };

  useEffect(() => {
    initializeApp();
  }, [chain]);

  return <>{state.content}</>;
};

export const RoutedApp = () => {
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
