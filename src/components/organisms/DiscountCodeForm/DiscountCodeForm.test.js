import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import DiscountCodeForm from './DiscountCodeForm';

const query = {
  shoppingCart: {
    discountCode: 'TESTAPI',
    discount: 20.00,
  },
};

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<DiscountCodeForm query={query} />);
});
