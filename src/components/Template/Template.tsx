import { useCallback, useState, useEffect, PropsWithChildren } from 'react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { routes, RouteType } from 'routes';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { useNavigation } from './hooks/useNavigation';

import styles from './styles.module.scss';

import type { ItemType } from './types';
import type { ConverterType } from 'pages/Converters/components/Converter/types';

/*
 * Handle the component declaration.
 */

export const Template = (props: PropsWithChildren) => {
  const { children } = props;
  const { navigation } = useNavigation();
  const { pathname, hash } = useLocation();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [activePage, setActivePage] = useState(hash ? pathname : '');

  /*
   * Assign each route the icon and categories for enhanced mapping.
   */

  const items = routes.map(
    (route: RouteType): ItemType =>
      Object.assign(route, navigation.get(route.path))
  );

  /*
   * On mobile, when clicking an item, first close the menu and then switch the active state to the new item.
   */

  const onItemClick = useCallback(() => {
    if (window.innerWidth < 992) {
      setToggleMenu(false);
    }
  }, []);

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
            {items.map((item) => (
              <li
                key={item.path}
                data-testid={`navigation-page-${item.path}`}
                className={classNames(styles.page, {
                  [styles.active]:
                    item.path === activePage || item.path === pathname
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

                {item.categories && (
                  <ul
                    data-testid={`navigation-list-${item.path}`}
                    className={classNames(styles.list, {
                      [styles.active]: item.path === activePage
                    })}
                  >
                    {item.categories.map((category) => (
                      <li key={category.name} className={styles.category}>
                        <a
                          onClick={onItemClick}
                          href={`${item.path}#${category.identifier}`}
                          data-testid={`navigation-category-${category.identifier}`}
                          className={classNames(styles.name, {
                            [styles.active]: hash.includes(category.identifier)
                          })}
                        >
                          {category.name}
                        </a>

                        {category.converters && (
                          <ul className={styles.converters}>
                            {category.converters.map(
                              (converter: ConverterType) => (
                                <li
                                  key={converter.title}
                                  className={styles.converter}
                                >
                                  <a
                                    onClick={onItemClick}
                                    data-testid={`navigation-item-#${category.identifier}-${converter.identifier}`}
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
                              )
                            )}
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
      </div>
    </div>
  );
};
