import { useEffect, memo, ComponentType } from 'react';

/*
 * Handle the higher order component declaration.
 */

const withPageTitle = (title: string, Component: ComponentType) => () => {
  const Memoized = memo(Component);

  /*
   * Assign the document title to the passed along title, to the wrapped component.
   */

  useEffect(() => {
    document.title = title;
  }, []);

  /*
   * Return the rendered component.
   */

  return <Memoized />;
};

export default withPageTitle;
