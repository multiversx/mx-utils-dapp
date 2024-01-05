import { SignTransactionsModals } from '@multiversx/sdk-dapp/UI/SignTransactionsModals/SignTransactionsModals';
import { TransactionsToastList } from '@multiversx/sdk-dapp/UI/TransactionsToastList';
import {
  Route,
  Routes,
  BrowserRouter,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { Template } from 'components/Template';
import { ContextProvider } from 'context';
import { Page404 } from 'pages/Page404';
import { Unlock } from 'pages/Unlock/Unlock';
import { routes, routeNames } from 'routes';
import 'assets/sass/theme.scss';

/*
 * Handle the component declaration.
 */

export const RoutedApp = () => {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  return (
    <ContextProvider>
      <TransactionsToastList />
      <SignTransactionsModals />
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
    </ContextProvider>
  );
};

export const App = () => (
  <BrowserRouter>
    <RoutedApp />
  </BrowserRouter>
);
