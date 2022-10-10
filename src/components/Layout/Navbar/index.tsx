import React, { MouseEvent, useCallback } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { dAppName } from 'config';
import { useDispatch, useGlobalContext } from 'context';
import { ReactComponent as ElrondLogo } from 'assets/img/elrond.svg';
import { ReactComponent as ElrondSymbol } from 'assets/img/elrond-symbol.svg';

import styles from './styles.module.scss';

const Navbar = () => {
  const { isMenuToggled } = useGlobalContext();

  const dispatch = useDispatch();
  const onMenuTrigger = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      dispatch({ type: 'getIsMenuToggled', isMenuToggled: !isMenuToggled });
    },
    [dispatch, isMenuToggled]
  );

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to='/converters' className={styles.heading}>
          <div className={styles.logo}>
            <ElrondLogo />
          </div>

          <div className={classNames(styles.logo, styles.symbol)}>
            <ElrondSymbol />
          </div>

          <span className={styles.application}>{dAppName}</span>
        </Link>

        <div className={styles.right}>
          <div className={styles.mode}>
            <FontAwesomeIcon icon={true ? faSun : faMoon} />
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

export default Navbar;
