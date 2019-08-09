import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import DeleteProductFromShoppingCartButton from './DeleteProductFromShoppingCartButton';

it('renders without crashing', () => {
  const mockedWine = {
    wine: {
      product: {
        id: 100,
      },
    },
  };

  const renderer = new ShallowRenderer();
  renderer.render(<DeleteProductFromShoppingCartButton product={mockedWine.product} />);
});
