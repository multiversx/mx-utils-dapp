import { useCallback, useEffect } from 'react';

import { useDispatch, useGlobalContext } from 'context';
import { StateType } from 'context/state';

import { ThemeEnumType } from './enum';
import { storage } from './storage';

/*
 * Handle the custom hook declaration.
 */

export const useTheme = () => {
  const { theme } = useGlobalContext();
  const dispatch = useDispatch();

  /*
   * Dispatch the correct theme state, based on local storage and user selection.
   */

  const loadStylesheet = useCallback(() => {
    const localTheme: StateType['theme'] = storage.getLocalItem('theme');
    const defaultTheme = Object.values(ThemeEnumType).find(
      (mode) => window.matchMedia(`(prefers-color-scheme: ${mode})`).matches
    );

    if (!localTheme && defaultTheme !== theme) {
      dispatch({
        type: 'switchTheme',
        theme: defaultTheme || ThemeEnumType.dark
      });
    }

    if (localTheme && theme !== localTheme) {
      dispatch({ type: 'switchTheme', theme: localTheme });
    }

    if (theme) {
      document.body.classList.remove(ThemeEnumType.dark, ThemeEnumType.light);
      document.body.classList.add(theme);
    }
  }, [dispatch, theme]);

  /*
   * On mount, run the stylesheeting loading function.
   */

  useEffect(loadStylesheet, [loadStylesheet]);

  /*
   * Return the theme value from the hook.
   */

  return { theme };
};
