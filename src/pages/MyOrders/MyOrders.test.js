import React from 'react';

import ShallowRenderer from 'react-test-renderer/shallow';

import MyOrders from './MyOrders';

it('renders without crashing', () => {
  // Uses ShallowRenderer to avoid executing GraphQL queries
  const renderer = new ShallowRenderer();
  renderer.render(<MyOrders />);
});
