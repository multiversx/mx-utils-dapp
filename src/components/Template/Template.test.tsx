import { MemoryRouter, useLocation } from 'react-router-dom';
import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { ContextProvider } from 'context';

import { Converters } from 'pages/Converters';

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

vi.mock('react-router-dom', async () => {
  const actual = (await vi.importActual('react-router-dom')) as object;
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/converters',
      hash: '#addresses-bech32-to-hexadecimal'
    })
  };
});

/*
 * Describe the Template integration test, and mock the "scrollIntoView" method through Jest.
 */

describe('Template test integration test.', () => {
  Object.assign(window.HTMLElement.prototype, {
    scrollIntoView: vi.fn()
  });

  /*
   * Describe the mobile menu integration test, and mock the window size to be of a mobile viewport.
   */

  describe('Interaction with the navigation menu on mobile.', async () => {
    Object.assign(window, { innerWidth: 375 });
    render(<MockTemplate />);

    const view = renderHook(useLocation);
    const location = view.result.current;
    const burger = await screen.findByTestId('navbar-burger');
    const navigation = screen.getByTestId('navigation');
    const page = screen.getByTestId(`navigation-page-${location.pathname}`);

    /*
     * Test if all classes are assigned properly when opening the menu, and then when closing it right away.
     */

    test('Successful state and class handling of opening and closure of menu.', () => {
      fireEvent.click(burger);
      expect(navigation.classList.toString()).toContain('active');
      expect(burger.classList.toString()).toContain('active');
      expect(page.classList.toString()).toContain('active');

      fireEvent.click(burger);
      expect(navigation.classList.toString()).not.toContain('active');
      expect(burger.classList.toString()).not.toContain('active');
    });

    /*
     * Test if all interactions are processed properly when opening the menu, then navigating to a category of the navigation.
     */

    test('Successful state and class handling of opening the menu and scrolling to a category.', () => {
      fireEvent.click(burger);
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
      expect(navigation.classList.toString()).not.toContain('active');
      expect(burger.classList.toString()).not.toContain('active');
    });

    /*
     * Test if all interactions are processed properly when opening the menu, then navigating to a converter of the navigation.
     */

    test('Successful state and class handling of opening the menu and scrolling to a converter.', () => {
      fireEvent.click(burger);
      expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
      expect(navigation.classList.toString()).not.toContain('active');
      expect(burger.classList.toString()).not.toContain('active');
    });
  });

  /*
   * Test if all classes and elements are assigned properly, by mocking a desktop viewport size.
   */

  test('Successful display of the navigation on desktop, regardless of state.', async () => {
    Object.assign(window, { innerWidth: 1200 });
    render(<MockTemplate />);

    const navigation = await screen.findByTestId('navigation');
    const burger = screen.getByTestId('navbar-burger');

    expect(navigation.classList.toString()).toContain('active');
    expect(burger.classList.toString()).not.toContain('active');
  });
});
