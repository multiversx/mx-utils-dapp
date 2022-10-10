import React, { useCallback, useState, useEffect } from 'react';
import {
  faArrowRightArrowLeft,
  faCaretDown,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { useDispatch, useGlobalContext } from 'context';
import { categories as converterCategories } from 'pages/Converters/categories';

import routes, { RouteType } from 'routes';

import styles from './styles.module.scss';
import { TemplatePropsTypes, NavigationType, ItemType } from './types';

const Template = (props: TemplatePropsTypes) => {
  const [active, setActive] = useState('');
  const dispatch = useDispatch();

  const { children } = props;
  const { pathname, hash } = useLocation();
  const { isMenuToggled } = useGlobalContext();

  const mapNavigation = useCallback(
    (navigation: NavigationType[]) =>
      new Map(navigation.map((item) => [item.path, item])),
    []
  );

  const onItemClick = useCallback(() => {
    if (window.innerWidth < 992) {
      dispatch({ type: 'getIsMenuToggled', isMenuToggled: false });
      setTimeout(() => setActive(''), 400);
    }
  }, [dispatch]);

  const scrollToSection = useCallback(() => {
    if (hash && document.querySelector(hash)) {
      const element = document.querySelector(hash);
      const behavior: ScrollIntoViewOptions = { block: 'start' };

      if (element) {
        element.scrollIntoView(behavior);
      }
    }
  }, [hash]);

  const navigation = mapNavigation([
    {
      path: '/home',
      icon: faHome
    },
    {
      path: '/converters',
      categories: converterCategories,
      icon: faArrowRightArrowLeft
    }
  ]);

  const items = routes.map(
    (route: RouteType): ItemType =>
      Object.assign(route, navigation.get(route.path))
  );

  useEffect(scrollToSection, [scrollToSection]);

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

      <div className={styles.content}>{children}</div>
    </main>
  );
};

export default Template;
