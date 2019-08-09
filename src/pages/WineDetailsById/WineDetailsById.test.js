import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WineDetailsById from './WineDetailsById';

it('renders without crashing', () => {

  // Uses ShallowRenderer to avoid executing GraphQL queries
  const renderer = new ShallowRenderer();
  const modckedMatch = {
    params: {
      id: 123,
    },
  };
  renderer.render(<WineDetailsById match={modckedMatch} />);
});
