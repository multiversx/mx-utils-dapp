import { MouseEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import moment from 'moment';

import { application } from 'config';
import { useDispatch, useGlobalContext } from 'context';
import { ReactComponent as ElrondLogo } from 'assets/img/elrond.svg';
import { ReactComponent as ElrondSymbol } from 'assets/img/elrond-symbol.svg';
import { ThemeEnumType } from 'helpers/enum';
import storage from 'helpers/storage';

import styles from './styles.module.scss';

const Navbar = () => {
  const { isMenuToggled, theme } = useGlobalContext();

  const isDark = theme === ThemeEnumType.dark;
  const dispatch = useDispatch();

  /*
   * On menu triggering, update the context by dispatching a toggled action type.
   */

  const onMenuTrigger = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch({ type: 'getIsMenuToggled', isMenuToggled: !isMenuToggled });
    },
    [dispatch, isMenuToggled]
  );

  /*
   * Switch between light mode and dark mode (local state dispatcher and local storage).
   * The local state will hold for six months after which it'll be removed.
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

          <span className={styles.application}>{application}</span>
        </Link>

        <div className={styles.right}>
          <div className={styles.mode} onClick={onThemeSwitch}>
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
          </div>

          <div
            onClick={onMenuTrigger}
            className={classNames(styles.burger, {
              [styles.active]: isMenuToggled
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

export { Navbar };
