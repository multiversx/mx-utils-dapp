import { useLocation } from 'react-router-dom';

export const useCallbackRoute = () => {
  const { pathname, search } = useLocation();
  return `${pathname}${search}`;
};
