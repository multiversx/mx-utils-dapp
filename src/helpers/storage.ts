import moment from 'moment';

type ExpiresType = number | false;
type LocalKeyType = 'nativeAuthToken';

interface SetLocalItemType {
  key: LocalKeyType;
  data: string;
  expires: ExpiresType;
}

export const storage = {
  setLocalItem: (parameters: SetLocalItemType) => {
    const { key, data, expires } = parameters;
    const payload = { expires, data };

    localStorage.setItem(key, JSON.stringify(payload));
  },
  getLocalItem: (key: LocalKeyType) => {
    const entry = localStorage.getItem(key);
    const item = entry ? JSON.parse(entry) : null;

    if (!entry) {
      return null;
    }

    if (!item.hasOwnProperty('expires') || !item.hasOwnProperty('data')) {
      localStorage.removeItem(key);

      return null;
    }

    if (item.expires !== false && moment().unix() > item.expires) {
      localStorage.removeItem(key);

      return null;
    }

    return item.data;
  },
  removeLocalItem: (key: LocalKeyType) => {
    localStorage.removeItem(key);
  }
};
