import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import AddWineToList from './AddWineToList';

it('renders without crashing', () => {
  const mockedWine = {
    wine: {
      product: {
        id: 100,
      },
    },
  };

  const renderer = new ShallowRenderer();
  renderer.render(<AddWineToList wine={mockedWine} />);
});
