import React from 'react';

import ShallowRenderer from 'react-test-renderer/shallow';

import Dashboard from './Dashboard';

it('renders without crashing', () => {
  // Uses ShallowRenderer to avoid executing GraphQL queries
  const renderer = new ShallowRenderer();
  renderer.render(<Dashboard />);
});
