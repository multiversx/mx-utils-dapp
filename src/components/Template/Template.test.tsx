import { MemoryRouter, useLocation } from 'react-router-dom';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';

import { ContextProvider } from 'context';

import Converters from 'pages/Converters';

/*
 * Mock the Template component by wrapping it inside the required providers.
 */

const MockTemplate = () => (
  <MemoryRouter>
    <ContextProvider>
      <Converters />
    </ContextProvider>
  </MemoryRouter>
);

/*
 * Mock the "useLocation()" hook from "react-router-dom".
 */

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: '/converters',
    hash: '#addresses-bech32-to-hexadecimal'
  }))
}));

/*
 * Describe the Template integration test, and mock the "scrollIntoView" method through Jest.
 */

describe('Template test integration test.', () => {
  Object.assign(window.HTMLElement.prototype, {
    scrollIntoView: jest.fn()
  });

  /*
   * Describe the mobile menu integration test, and mock the window size to be of a mobile viewport.
   */

  describe('Interaction with the navigation menu on mobile.', () => {
    Object.assign(window, { innerWidth: 375 });
    render(<MockTemplate />);

    const view = renderHook(useLocation);
    const location = view.result.current;
    const burger = screen.getByTestId('navbar-burger');
    const navigation = screen.getByTestId('navigation');
    const page = screen.getByTestId(`navigation-page-${location.pathname}`);
    const item = screen.getByTestId(`navigation-item-${location.hash}`);
    const caret = screen.getByTestId(`navigation-caret-${location.pathname}`);
    const list = screen.getByTestId(`navigation-list-${location.pathname}`);
    const converter = screen.getByTestId(`converter-${location.hash}`);

    const category = location.hash.substring(1, location.hash.indexOf('-'));
    const section = screen.getByTestId(`navigation-category-${category}`);

    /*
     * Test if all classes are assigned properly when opening the menu, and then when closing it right away.
     */

    test('Successful state and class handling of opening and closure of menu.', () => {
      fireEvent.click(burger);
      expect(navigation.classList).toContain('active');
      expect(burger.classList).toContain('active');
      expect(caret.classList).toContain('active');
      expect(page.classList).toContain('active');
      expect(list.classList).toContain('active');
      expect(item.classList).toContain('active');

      fireEvent.click(burger);
      expect(navigation.classList).not.toContain('active');
      expect(burger.classList).not.toContain('active');
    });

    /*
     * Test if all interactions are processed properly when opening the menu, then navigating to a category of the navigation.
     */

    test('Successful state and class handling of opening the menu and scrolling to a category.', () => {
      fireEvent.click(burger);
      fireEvent.click(section);
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
      expect(navigation.classList).not.toContain('active');
      expect(burger.classList).not.toContain('active');
    });

    /*
     * Test if all interactions are processed properly when opening the menu, then navigating to a converter of the navigation.
     */

    test('Successful state and class handling of opening the menu and scrolling to a converter.', () => {
      fireEvent.click(burger);
      fireEvent.click(item);
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
      expect(navigation.classList).not.toContain('active');
      expect(burger.classList).not.toContain('active');
      expect(converter.classList).toContain('active');
    });
  });

  /*
   * Test if all classes and elements are assigned properly, by mocking a desktop viewport size.
   */

  test('Successful display of the navigation on desktop, regardless of state.', () => {
    Object.assign(window, { innerWidth: 1200 });
    render(<MockTemplate />);

    const navigation = screen.getByTestId('navigation');
    const burger = screen.getByTestId('navbar-burger');

    expect(navigation.classList).toContain('active');
    expect(burger.classList).not.toContain('active');
  });
});
