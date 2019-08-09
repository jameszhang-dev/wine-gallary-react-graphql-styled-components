import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WineListSelection from './WineListSelection';

it('renders without crashing', () => {
  const mockedWine = {
    wine: {
      product: {
        id: 100,
      },
    },
  };

  const renderer = new ShallowRenderer();
  renderer.render(<WineListSelection wine={mockedWine} />);
});
