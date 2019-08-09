import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WineBlacklistRule from './WineBlacklistRule';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<WineBlacklistRule />);
});
