import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Gifts from './Gifts';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Gifts />);
});
