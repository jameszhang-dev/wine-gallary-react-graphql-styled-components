import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import AddProductToShoppingCartButton from './AddProductToShoppingCartButton';

it('renders without crashing', () => {
  const mockedWine = {
    wine: {
      product: {
        id: 100,
      },
    },
  };

  const renderer = new ShallowRenderer();
  renderer.render(<AddProductToShoppingCartButton product={mockedWine.product} />);
});
