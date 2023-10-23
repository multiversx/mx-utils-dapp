import {
  useCallback,
  useState,
  useEffect,
  PropsWithChildren,
  useMemo
} from 'react';
import {
  faCaretDown,
  faSignIn,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { routeNames, routes, RouteType } from 'routes';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { useNavigation } from './hooks/useNavigation';

import styles from './styles.module.scss';

import type { ItemType } from './types';
import {
  useGetAccountInfo,
  useGetIsLoggedIn
} from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils/logout';
import { Trim } from '@multiversx/sdk-dapp/UI';

/*
 * Handle the component declaration.
 */

export const Template = (props: PropsWithChildren) => {
  const { children } = props;
  const { navigation } = useNavigation();
  const { pathname, hash } = useLocation();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [activePage, setActivePage] = useState(hash ? pathname : '');

  const isLoggedIn = useGetIsLoggedIn();
  const { address } = useGetAccountInfo();

  /*
   * Assign each route the icon and categories for enhanced mapping.
   */

  const items = routes.map(
    (route: RouteType): ItemType =>
      Object.assign(route, navigation.get(route.path))
  );

  const menuItems = useMemo(
    () => items.filter((x) => x.path !== routeNames.unlock),
    [items]
  );

  /*
   * On mobile, when clicking an item, first close the menu and then switch the active state to the new item.
   */

  const onItemClick = useCallback(() => {
    if (window.innerWidth < 992) {
      setToggleMenu(false);
    }
  }, []);

  const onUnlockItemClick = useCallback(async () => {
    if (isLoggedIn) {
      await logout();
      return;
    }
    onItemClick();
  }, [onItemClick, isLoggedIn]);

  /*
   * Look for a potentially available hash parameter and scroll to the specific section, if found.
   */

  const scrollToSection = useCallback(() => {
    if (hash && document.querySelector(hash)) {
      const element = document.querySelector(hash);
      const behavior: ScrollIntoViewOptions = { block: 'start' };

      if (element) {
        element.scrollIntoView(behavior);
      }
    }
  }, [hash]);

  /*
   * On mount, scroll to the section if hash is present.
   */

  useEffect(scrollToSection, [scrollToSection]);

  /*
   * Return the rendered component.
   */

  return (
    <div>
      <Navbar setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />

      <div className={styles.template}>
        <div
          id='navigation'
          data-testid='navigation'
          className={classNames(styles.navigation, {
            [styles.active]: window.innerWidth < 992 ? toggleMenu : true
          })}
        >
          <h6 className={styles.menu}>Menu</h6>

          <ul className={styles.pages}>
            {menuItems.map((item) => (
              <li
                key={item.path}
                data-testid={`navigation-page-${item.path}`}
                className={classNames(styles.page, {
                  [styles.active]:
                    item.path === activePage || item.path === pathname
                })}
              >
                <div className={styles.item}>
                  <Link
                    to={item.path}
                    className={styles.path}
                    onClick={onItemClick}
                  >
                    <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                    <span className={styles.title}>{item.title}</span>
                  </Link>

                  {item.categories && (
                    <div
                      className={styles.trigger}
                      onClick={() =>
                        setActivePage(activePage === '' ? item.path : '')
                      }
                    >
                      <span
                        data-testid={`navigation-caret-${item.path}`}
                        className={classNames(styles.caret, {
                          [styles.active]: item.path === activePage
                        })}
                      >
                        <FontAwesomeIcon icon={faCaretDown} />
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
            <li
              key='unlock'
              data-testid='navigation-page-unlock'
              className={classNames(styles.page, {
                [styles.active]:
                  routeNames.unlock === activePage ||
                  routeNames.unlock === pathname
              })}
            >
              <div className={styles.item} style={{ display: 'inherit' }}>
                <Link
                  to={isLoggedIn ? '' : routeNames.unlock}
                  className={classNames(styles.path, styles.unlock)}
                  onClick={onUnlockItemClick}
                >
                  <div className={styles.title}>
                    {isLoggedIn ? (
                      <FontAwesomeIcon
                        icon={faSignOut}
                        className={styles.icon}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faSignIn}
                        className={styles.icon}
                      />
                    )}
                    <span className={styles.title}>
                      {isLoggedIn ? 'Logout' : 'Login'}
                    </span>
                  </div>
                  <div className={styles.address}>
                    <Trim text={address} className={styles.title} />
                  </div>
                </Link>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.content}>
          <div className={styles.wrapper}>
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
