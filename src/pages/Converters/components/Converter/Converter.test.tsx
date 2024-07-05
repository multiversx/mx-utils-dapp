import { BrowserRouter } from 'react-router-dom';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor
} from '@testing-library/react';

import { useCategories } from 'pages/Converters/hooks/useCategories';
import { ContextProvider } from 'context';

import { Converter } from './Converter';

import type { ConverterType } from './types';

/*
 * Mock the Converter component by wrapping it inside the required providers.
 */

const MockConverter = (props: ConverterType) => (
  <BrowserRouter>
    <ContextProvider>
      <Converter {...props} />
    </ContextProvider>
  </BrowserRouter>
);

/*
 * Integration test for inputting a value, submitting, proper conversion, and input clearance.
 */

test('Successful input conversion and input clearance integration tests.', async () => {
  const view = renderHook(useCategories);
  const [category] = view.result.current.categories;
  const [converter] = category.converters;

  const mock = {
    input: 'erd1axhx4kenjlae6sknq7zjg2g4fvzavv979r2fg425p62wkl84avtqsf7vvv',
    output: 'e9ae6adb3397fb9d42d307852429154b05d630be28d49455540e94eb7cf5eb16'
  };

  (() => {
    render(<MockConverter {...converter} />);
  })();

  const identifier = converter.identifier;
  const field = await screen.findByTestId(`${identifier}-field`);
  const submit = screen.getByTestId(`${identifier}-submit-button`);
  const clear = screen.queryByTestId(`${identifier}-clear-button`);
  const value = screen.queryByTestId(`${identifier}-value`);
  const error = screen.queryByTestId(`${identifier}-error`);

  expect(field).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
  expect(clear).not.toBeInTheDocument();
  expect(value).not.toBeInTheDocument();
  expect(error).not.toBeInTheDocument();

  fireEvent.change(field, {
    target: { value: mock.input }
  });

  await waitFor(async () => {
    await waitFor(async () => {
      fireEvent.click(submit);
    });

    const elements = {
      value: screen.getByTestId(`${identifier}-value`),
      error: screen.queryByTestId(`${identifier}-error`),
      clear: screen.queryByTestId(`${identifier}-clear-button`)
    };

    expect(elements.clear).toBeInTheDocument();
    expect(elements.value).toBeInTheDocument();
    expect(elements.error).not.toBeInTheDocument();
    expect(elements.value).toHaveTextContent(mock.output);
    expect(field).toHaveDisplayValue(mock.input);
  });

  await waitFor(async () => {
    const elements = {
      clear: screen.queryByTestId(`${identifier}-clear-button`),
      value: screen.queryByTestId(`${identifier}-value`)
    };

    if (elements.clear) {
      fireEvent.click(elements.clear);
    }

    expect(elements.clear).not.toBeInTheDocument();
    expect(elements.value).not.toBeInTheDocument();
    expect(field).toHaveDisplayValue('');
  });
});

/*
 * Integration test for the purpose of properly handling a conversion error because of missing input.
 */

test('Successful error handling due to lack of input.', async () => {
  const view = renderHook(useCategories);
  const [category] = view.result.current.categories;
  const [converter] = category.converters;

  (() => {
    render(<MockConverter {...converter} />);
  })();

  const identifier = converter.identifier;
  const submit = await screen.findByTestId(`${identifier}-submit-button`);

  await waitFor(async () => {
    await act(async () => {
      fireEvent.click(submit);
    });

    const elements = {
      value: screen.queryByTestId(`${identifier}-value`),
      clear: screen.queryByTestId(`${identifier}-clear-button`),
      error: screen.getByTestId(`${identifier}-error`)
    };

    expect(elements.clear).not.toBeInTheDocument();
    expect(elements.value).not.toBeInTheDocument();
    expect(elements.error).toHaveTextContent(converter.validate.required);
  });
});

/*
 * Integration test for the purpose of properly handling a conversion error because of wrong input.
 */

test('Successful error handling due to wrong input.', async () => {
  const view = renderHook(useCategories);
  const [category] = view.result.current.categories;
  const [converter] = category.converters;

  (() => {
    render(<MockConverter {...converter} />);
  })();

  const identifier = converter.identifier;
  const field = await screen.findByTestId(`${identifier}-field`);
  const submit = screen.getByTestId(`${identifier}-submit-button`);

  fireEvent.change(field, {
    target: { value: 'lorem ipsum' }
  });

  await waitFor(async () => {
    await act(async () => {
      fireEvent.click(submit);
    });

    const elements = {
      value: screen.queryByTestId(`${identifier}-value`),
      clear: screen.queryByTestId(`${identifier}-clear-button`),
      error: screen.getByTestId(`${identifier}-error`)
    };

    expect(elements.clear).not.toBeInTheDocument();
    expect(elements.value).not.toBeInTheDocument();

    if (converter.validate.test) {
      expect(elements.error).toHaveTextContent(converter.validate.test.error);
    }
  });
});
