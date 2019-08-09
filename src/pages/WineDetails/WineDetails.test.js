import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WineDetails from './WineDetails';

it('renders without crashing', () => {

  // Uses ShallowRenderer to avoid executing GraphQL queries
  const renderer = new ShallowRenderer();
  const modckedMatch = {
    params: {
      slug: 'pinot-noir-2015',
    },
  };
  renderer.render(<WineDetails match={modckedMatch} />);
});
