import { useCallback, useState } from 'react';

export const usePersistedState = <T>({
  storage,
  key,
  initialValue
}: {
  storage: Storage;
  key: string;
  initialValue?: T;
}): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = storage.getItem(key);

    try {
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.error(err);
      return item || initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        storage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
        console.error(err);
      }
    },
    [key, storage, storedValue]
  );

  return [storedValue, setValue];
};
