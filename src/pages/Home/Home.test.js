import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Home from './Home';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Home />);
});
