import {
  useCallback,
  useState,
  useMemo,
  useEffect,
  PropsWithChildren
} from 'react';
import {
  faArrowRightArrowLeft,
  faCaretDown,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Footer } from 'components/Layout/Footer';
import { useDispatch, useGlobalContext } from 'context';
import { categories as converterCategories } from 'pages/Converters/categories';
import routes, { RouteType } from 'routes';

import { NavigationType, ItemType } from './types';

import styles from './styles.module.scss';

const Template = (props: PropsWithChildren) => {
  const [active, setActive] = useState('');
  const dispatch = useDispatch();

  const { children } = props;
  const { pathname, hash } = useLocation();
  const { isMenuToggled } = useGlobalContext();

  /*
   * Convert the given navigation, sent as an array, to a new Map instance for smoother retrieval, using get().
   */

  const mapNavigation = useCallback(
    (navigation: NavigationType[]) =>
      new Map(navigation.map((item) => [item.path, item])),
    []
  );

  /*
   * On mobile, when clicking an item, first close the menu and then switch the active state to the new item.
   */

  const onItemClick = useCallback(() => {
    if (window.innerWidth < 992) {
      dispatch({ type: 'getIsMenuToggled', isMenuToggled: false });
      setTimeout(() => setActive(''), 400);
    }
  }, [dispatch]);

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
   * The memoized mapped navigation, controls the left sidebar navigation display.
   */

  const navigation = useMemo(
    () =>
      mapNavigation([
        {
          path: '/',
          icon: faHome
        },
        {
          path: '/converters',
          categories: converterCategories,
          icon: faArrowRightArrowLeft
        }
      ]),
    [mapNavigation]
  );

  /*
   * Check whether any active item in the menu, and open it by default.
   */

  const shouldMenuMountOpened = useCallback(() => {
    const menu = navigation.get(pathname);

    if (menu && menu.categories) {
      const opened = menu.categories.some((category) =>
        hash.includes(category.identifier)
      );

      if (opened) {
        setActive(pathname);
      }
    }
  }, [hash, navigation, pathname]);

  /*
   * Assign each route the icon and categories for enhanced mapping.
   */

  const items = routes.map(
    (route: RouteType): ItemType =>
      Object.assign(route, navigation.get(route.path))
  );

  /*
   * On mount, trigger the following actions:
   * - Scroll to the section if hash is present.
   * - Open the menu if any child item is active.
   */

  useEffect(scrollToSection, [scrollToSection]);
  useEffect(shouldMenuMountOpened, [shouldMenuMountOpened]);

  return (
    <main className={styles.template}>
      <div
        id='navigation'
        className={classNames(styles.navigation, {
          [styles.active]: isMenuToggled
        })}
      >
        <h6 className={styles.menu}>Menu</h6>

        <ul className={styles.pages}>
          {items.map((item) => (
            <li
              key={item.path}
              className={classNames(styles.page, {
                [styles.active]: item.path === pathname || item.path === active
              })}
            >
              <div className={styles.item}>
                <a
                  href={item.path}
                  className={styles.path}
                  onClick={onItemClick}
                >
                  <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                  <span className={styles.title}>{item.title}</span>
                </a>

                {item.categories && (
                  <div
                    className={styles.trigger}
                    onClick={() =>
                      setActive((current) =>
                        current === item.path ? '' : item.path
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className={classNames(styles.caret, {
                        [styles.active]: item.path === active
                      })}
                    />
                  </div>
                )}
              </div>

              {item.categories && (
                <ul
                  className={classNames(styles.list, {
                    [styles.active]: active === item.path
                  })}
                >
                  {item.categories.map((category) => (
                    <li key={category.name} className={styles.category}>
                      <a
                        onClick={onItemClick}
                        href={`${item.path}#${category.identifier}`}
                        className={classNames(styles.name, {
                          [styles.active]: hash.includes(category.identifier)
                        })}
                      >
                        {category.name}
                      </a>

                      {category.converters && (
                        <ul className={styles.converters}>
                          {category.converters.map((converter) => (
                            <li
                              key={converter.title}
                              className={styles.converter}
                            >
                              <a
                                onClick={onItemClick}
                                href={`${item.path}#${category.identifier}-${converter.identifier}`}
                                className={classNames(styles.text, {
                                  [styles.active]: hash.includes(
                                    `${category.identifier}-${converter.identifier}`
                                  )
                                })}
                              >
                                {converter.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.content}>
        <div className={styles.wrapper}>
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
};

export { Template };
