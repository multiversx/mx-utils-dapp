import { ChangeEvent, useMemo } from 'react';
import styles from './styles.module.scss';
import { CodeMetadataType } from '../../types/deployOrUpgradeParams';

const metadataOptions: {
  id: string;
  label: string;
  value: keyof CodeMetadataType;
  checked: boolean;
}[] = [
  {
    id: 'upgradeable',
    label: 'Upgradeable',
    value: 'upgradeable',
    checked: true
  },
  {
    id: 'readable',
    label: 'Readable',
    value: 'readable',
    checked: true
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
    checked: true
  }
];

export const CodeMetadata = ({
  codeMetadata,
  onMetadataChange
}: {
  codeMetadata: CodeMetadataType;
  onMetadataChange: (metadata: CodeMetadataType) => void;
}) => {
  const metadata = useMemo(() => {
    return metadataOptions.map((item) => {
      if (codeMetadata[item.value] != null) {
        item.checked = Boolean(codeMetadata[item.value]);
      }
      return item;
    });
  }, [codeMetadata]);

  const handleMetadataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedMetadata = metadata.map((item) => {
      if (item.value === value) {
        return { ...item, checked };
      }
      return item;
    });
    onMetadataChange(
      Object.fromEntries(
        updatedMetadata.map((item) => [item.value, item.checked])
      )
    );
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
