import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import HeaderDiscountMessage from './HeaderDiscountMessage';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<HeaderDiscountMessage />);
});
