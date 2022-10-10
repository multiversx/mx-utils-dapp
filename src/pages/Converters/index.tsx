import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import Template from 'components/Template/Template';

import { categories } from './categories';
import Converter from './components/Converter/Converter';

import styles from './styles.module.scss';

const Converters = () => {
  const { hash } = useLocation();

  return (
    <Template>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div key={category.identifier} className={styles.category}>
            <h2 className={styles.name}>{category.name}</h2>
            <span className={styles.anchor} id={category.identifier} />

            <div className={styles.converters}>
              {category.converters.map((converter) => (
                <div
                  key={converter.title}
                  className={classNames(styles.converter, {
                    [styles.active]:
                      hash === `#${category.identifier}-${converter.identifier}`
                  })}
                >
                  <span
                    className={styles.anchor}
                    id={`${category.identifier}-${converter.identifier}`}
                  />

                  <h3 className={styles.title}>{converter.title}</h3>
                  <Converter {...converter} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Template>
  );
};

export default Converters;
