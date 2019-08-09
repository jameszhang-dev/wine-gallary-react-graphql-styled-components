import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Header from './Header';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Header />);
});
