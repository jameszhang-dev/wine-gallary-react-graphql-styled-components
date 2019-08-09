import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WineBlacklist from './WineBlacklist';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<WineBlacklist />);
});
