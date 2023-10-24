import { Input } from './components/Input';
import { Metric } from './components/Metric';
import styles from './styles.module.scss';
import { useChain } from 'hooks/useChain';
import { useAuthenticationContext } from './context';

/*
 * Handle the component declaration.
 */

export const AuthenticationContent = () => {
  const { chain } = useChain();
  const { metrics, metricItems } = useAuthenticationContext();

  return (
    <div className={styles.authentication}>
      <div className={styles.left}>
        <h2 className={styles.subtitle}>Encoded</h2>

        <Input />
      </div>

      <div className={styles.right}>
        <h2 className={styles.subtitle}>
          <span>Decoded</span>
        </h2>

        {metrics && (
          <div className={styles.metrics}>
            {metricItems.map((metric) => (
              <Metric key={metric.identifier} chain={chain} {...metric} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
