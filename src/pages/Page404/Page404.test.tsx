import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { ContextProvider } from 'context';
import { Page404 } from './Page404';

/*
 * Mock the Page404 page by wrapping it inside the required providers.
 */

const MockPage404 = () => (
  <BrowserRouter>
    <ContextProvider>
      <Page404 />
    </ContextProvider>
  </BrowserRouter>
);

/*
 * Test if the required element are present on the page.
 */

test('Page 404 elements present in the document.', async () => {
  render(<MockPage404 />);

  const title = await screen.findByTestId('page404-title');
  const descriptions = await screen.findAllByTestId('page404-description');

  expect(title).toBeInTheDocument();
  expect(descriptions.length).toBe(2);

  descriptions.forEach((description) => {
    expect(description).toBeInTheDocument();
  });
});
