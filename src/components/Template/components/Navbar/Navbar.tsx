import { MouseEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { ThemeEnumType } from 'helpers/enum';
import { useGlobalContext } from 'context';
import { MultiversXLogo } from 'assets/img/MultiversXLogo';

import styles from './styles.module.scss';

import type { NavbarPropsType } from './types';

/*
 * Handle the component declaration.
 */

export const Navbar = (props: NavbarPropsType) => {
  const { setToggleMenu, toggleMenu } = props;
  const { theme } = useGlobalContext();

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
            <MultiversXLogo />
          </div>
        </Link>

        <div className={styles.right}>
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
