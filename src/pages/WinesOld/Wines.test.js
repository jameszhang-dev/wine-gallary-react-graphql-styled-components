import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Wines from './Wines';

it('renders without crashing', () => {

  // Uses ShallowRenderer to avoid executing GraphQL queries
  const renderer = new ShallowRenderer();
  renderer.render(<Wines />);
});
