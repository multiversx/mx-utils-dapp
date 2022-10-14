import { useCallback, useEffect } from 'react';

import { useDispatch, useGlobalContext } from 'context';
import { StateType } from 'context/state';

import { ThemeEnumType } from './enum';
import storage from './storage';

const useTheme = () => {
  const { theme } = useGlobalContext();
  const dispatch = useDispatch();

  /*
   * Load the stylesheets conditionally, and update on each render, based on the environment.
   */

  const loadStylesheet = useCallback(() => {
    const defaultTheme = [ThemeEnumType.light, ThemeEnumType.dark].find(
      (mode) => window.matchMedia(`(prefers-color-scheme: ${mode})`).matches
    );

    const element = document.getElementById('stylesheet');
    const stylesheet = element as HTMLAnchorElement;
    const localTheme: StateType['theme'] = storage.getLocalItem('theme');
    const isDevelopment = process.env.NODE_ENV === 'development';
    const shouldRequire = theme === localTheme || (!localTheme && theme === defaultTheme);

    if (!localTheme && defaultTheme !== theme) {
      dispatch({
        type: 'switchTheme',
        theme: defaultTheme || ThemeEnumType.dark
      });
    }

    if (localTheme && theme !== localTheme) {
      dispatch({ type: 'switchTheme', theme: localTheme });
    }

    // Load the uncompiled stylesheets, as SCSS files, conditionally, while developing.
    if (stylesheet && isDevelopment && shouldRequire) {
      stylesheet.setAttribute('href', '');

      if (theme === 'dark') {
        require('assets/sass/dark.scss');
      }

      if (theme === 'light') {
        require('assets/sass/light.scss');
      }
    }

    // Switch between the compiled stylesheets, by replacing the hyper-reference attribute, while in production.
    if (stylesheet && !isDevelopment && shouldRequire) {
      const alpha = stylesheet.href.lastIndexOf('/') + 1;
      const beta = stylesheet.href.indexOf('.css');
      const currentTheme = stylesheet.href.slice(alpha, beta);
      const updatedTheme = stylesheet.href.replace(currentTheme, theme);

      if (currentTheme !== theme) {
        stylesheet.setAttribute('href', updatedTheme);
      }
    }
  }, [dispatch, theme]);

  useEffect(loadStylesheet, [loadStylesheet]);
};

export default useTheme;
