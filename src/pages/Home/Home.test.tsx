import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { ContextProvider } from 'context';

import { Home } from './Home';

/*
 * Mock the Home page by wrapping it inside the required providers.
 */

const MockHome = () => (
  <BrowserRouter>
    <ContextProvider>
      <Home />
    </ContextProvider>
  </BrowserRouter>
);

/*
 * Test if the required element are present on the page.
 */

test('Home elements present in the document.', () => {
  render(<MockHome />);

  const title = screen.getByTestId('home-title');
  const descriptions = screen.getAllByTestId('home-description');

  expect(title).toBeInTheDocument();
  expect(descriptions.length).toBe(2);

  descriptions.forEach((description) => {
    expect(description).toBeInTheDocument();
  });
});
