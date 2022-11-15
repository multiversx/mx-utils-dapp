import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import Template from 'components/Template';
import Converter from './components/Converter';

import useCategories from './hooks/useCategories';

import styles from './styles.module.scss';

/*
 * Handle the component declaration.
 */

const Converters = () => {
  const { hash } = useLocation();
  const { categories } = useCategories();

  /*
   * Return the rendered component.
   */

  return (
    <Template>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div key={category.identifier} className={styles.category}>
            <span
              className={styles.anchor}
              id={category.identifier}
              data-testid={category.identifier}
            />

            <h2 className={styles.name} data-testid={category.name}>
              {category.name}
            </h2>

            <div className={styles.converters}>
              {category.converters.map((converter) => (
                <div
                  data-testid={`converter-#${category.identifier}-${converter.identifier}`}
                  key={converter.title}
                  className={classNames(styles.converter, {
                    [styles.active]:
                      hash === `#${category.identifier}-${converter.identifier}`
                  })}
                >
                  <span
                    className={styles.anchor}
                    id={`${category.identifier}-${converter.identifier}`}
                    data-testid={`${category.identifier}-${converter.identifier}`}
                  />

                  <h3 className={styles.title} data-testid={converter.title}>
                    {converter.title}
                  </h3>

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
