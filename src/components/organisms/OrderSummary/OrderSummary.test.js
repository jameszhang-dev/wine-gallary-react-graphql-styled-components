import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import OrderSummary from './OrderSummary';

const query = {
  shoppingCart: {
    discountCode: 'TESTAPI',
    discount: 20.00,
    total: 150.00,
    shoppingcartitemSet: [
      {
        quantity: 2,
        product: {
          id: 1,
          name: 'Wine 1',
        },
      },
      {
        quantity: 1,
        product: {
          id: 2,
          name: 'Wine 2',
        },
      },
    ],
  },
};

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<OrderSummary query={query} />);
});
