import { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';

const metadataOptions = [
  {
    id: 'upgradeable',
    label: 'Upgradeable',
    value: 'upgradeable',
    checked: false
  },
  {
    id: 'readable',
    label: 'Readable',
    value: 'readable',
    checked: false
  },
  {
    id: 'payable',
    label: 'Payable',
    value: 'payable',
    checked: false
  },
  {
    id: 'payableBySc',
    label: 'Payable By Smart Contract',
    value: 'payableBySc',
    checked: false
  }
];

export const CodeMetadata = () => {
  const [metadata, setMetadata] = useState(metadataOptions);

  const handleMetadataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedMetadata = metadata.map((item) => {
      if (item.value === value) {
        return { ...item, checked };
      }
      return item;
    });
    setMetadata(updatedMetadata);
  };

  return (
    <div className={styles.codeMetadata}>
      {metadata.map((item) => (
        <label key={item.id} className={styles.container}>
          {item.label}
          <input
            type='checkbox'
            value={item.value}
            checked={item.checked}
            onChange={handleMetadataChange}
          />
          <span className={styles.checkmark} />
        </label>
      ))}
    </div>
  );
};
