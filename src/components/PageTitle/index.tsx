import { useEffect, memo, ComponentType } from 'react';

const withPageTitle = (title: string, Component: ComponentType) => () => {
  const Memoized = memo(Component);

  useEffect(() => {
    document.title = title;
  }, []);

  return <Memoized />;
};

export default withPageTitle;
