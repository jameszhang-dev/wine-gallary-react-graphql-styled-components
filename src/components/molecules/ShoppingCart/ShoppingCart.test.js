import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ShoppingCart from './ShoppingCart';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ShoppingCart />);
});
