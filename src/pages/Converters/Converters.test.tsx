import { BrowserRouter } from 'react-router-dom';
import { render, renderHook, screen } from '@testing-library/react';

import { ContextProvider } from 'context';
import Converters from './Converters';
import useCategories from './hooks/useCategories';

/*
 * Mock the Converters component by wrapping it inside the required providers.
 */

const MockConverters = () => (
  <BrowserRouter>
    <ContextProvider>
      <Converters />
    </ContextProvider>
  </BrowserRouter>
);

/*
 * Mock a map of hard-coded conversions (input/output) for all computing functions.
 */

const mockConversions = new Map([
  [
    'bech32-to-hexadecimal',
    {
      input: 'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex',
      output: '75cb87c24351a67b892f57dcec0eb2b2a07aafab2f1aab741a10fc61059f2fe8'
    }
  ],
  [
    'hexadecimal-to-bech32',
    {
      input: '75cb87c24351a67b892f57dcec0eb2b2a07aafab2f1aab741a10fc61059f2fe8',
      output: 'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex'
    }
  ],
  ['decimal-to-hexadecimal', { input: '91', output: '5b' }],
  ['hexadecimal-to-decimal', { input: '5b', output: '91' }],
  ['decimal-to-base64', { input: '1479', output: 'MTQ3OQ==' }],
  ['base64-to-decimal', { input: 'MTQ3OQ==', output: '1479' }],
  ['decimal-to-integer', { input: '10.5', output: '10500000000000000000' }],
  ['integer-to-decimal', { input: '10500000000000000000', output: '10.5000' }],
  ['string-to-hexadecimal', { input: 'ok', output: '6f6b' }],
  ['hexadecimal-to-string', { input: '6f6b', output: 'ok' }],
  ['string-to-base64', { input: 'text', output: 'dGV4dA==' }],
  ['base64-to-string', { input: 'dGV4dA==', output: 'text' }],
  ['hexadecimal-to-base64', { input: '35db94', output: 'NduU' }],
  ['base64-to-hexadecimal', { input: 'NduU', output: '35db94' }]
]);

/*
 * Prepare the template and the categories' payload for testing.
 */

describe('Converters computing and displaying tests.', () => {
  render(<MockConverters />);

  const view = renderHook(useCategories);
  const categories = view.result.current.categories;

  /*
   * Test that each converter has all the required elements present in the document.
   */

  test('Categories and converter elements all present in the document.', () => {
    categories.forEach((category) => {
      const name = screen.getByTestId(category.name);
      const identifier = screen.getByTestId(category.identifier);

      expect(identifier).toBeInTheDocument();
      expect(name).toHaveTextContent(category.name);
      expect(category.converters.length).toBeGreaterThan(0);

      category.converters.forEach((converter) => {
        const anchor = screen.getByTestId(
          `${category.identifier}-${converter.identifier}`
        );
        const label = screen.getByTestId(`${converter.identifier}-label`);
        const field = screen.getByTestId(`${converter.identifier}-field`);
        const title = screen.getByTestId(converter.title);

        expect(anchor).toBeInTheDocument();
        expect(field).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(label).toBeInTheDocument();
      });
    });
  });

  /*
   * Test that each converter's computing function output matches the mocked output, based on the given mock input.
   */

  describe('Check if all computing functions process correctly based on mocked inputs and outputs.', () => {
    categories.forEach((category) => {
      const converters = category.converters;

      converters.forEach((converter) => {
        const mock = mockConversions.get(converter.identifier);

        if (mock && converter.compute) {
          test(`${converter.title}`, () => {
            expect(typeof converter.compute).toBe('function');
            expect(converter.compute(mock.input)).toBe(mock.output);
          });
        }
      });
    });
  });
});
