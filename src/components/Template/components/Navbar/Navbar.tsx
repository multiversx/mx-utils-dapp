import { MouseEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import moment from 'moment';

import { ThemeEnumType } from 'helpers/enum';
import { applicationName } from 'config';
import { useDispatch, useGlobalContext } from 'context';
import { ElrondLogo } from 'assets/img/ElrondLogo';
import { ElrondSymbol } from 'assets/img/ElrondSymbol';
import { storage } from 'helpers/storage';

import styles from './styles.module.scss';

import type { NavbarPropsType } from './types';

/*
 * Handle the component declaration.
 */

export const Navbar = (props: NavbarPropsType) => {
  const { setToggleMenu, toggleMenu } = props;
  const { theme } = useGlobalContext();

  const isDark = theme === ThemeEnumType.dark;
  const dispatch = useDispatch();

  /*
   * On menu triggering, update the passed along state to the opposite of the current boolean value.
   */

  const onMenuTrigger = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setToggleMenu((toggleMenu: boolean) => !toggleMenu);
    },
    [setToggleMenu]
  );

  /*
   * Switch between light mode and dark mode (local state dispatcher and local storage), which will be memorized for six months.
   */

  const onThemeSwitch = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();

      storage.setLocalItem({
        key: 'theme',
        data: isDark ? ThemeEnumType.light : ThemeEnumType.dark,
        expires: moment().add(6, 'months').unix()
      });

      dispatch({
        type: 'switchTheme',
        theme: isDark ? ThemeEnumType.light : ThemeEnumType.dark
      });
    },
    [isDark, dispatch]
  );

  /*
   * Return the rendered component.
   */

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to='/' className={styles.heading}>
          <div
            className={classNames(styles.logo, {
              [styles.dark]: theme === ThemeEnumType.light
            })}
          >
            <ElrondLogo />
          </div>

          <div
            className={classNames(styles.logo, styles.symbol, {
              [styles.dark]: theme === ThemeEnumType.light
            })}
          >
            <ElrondSymbol />
          </div>

          <span className={styles.application}>{applicationName}</span>
        </Link>

        <div className={styles.right}>
          <div className={styles.mode} onClick={onThemeSwitch}>
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
          </div>

          <div
            onClick={onMenuTrigger}
            data-testid='navbar-burger'
            className={classNames(styles.burger, {
              [styles.active]: toggleMenu
            })}
          >
            <div className={styles.bars}>
              {Array.from({ length: 3 }).map((item, index) => (
                <span className={styles.bar} key={`bar-${index}`}></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
