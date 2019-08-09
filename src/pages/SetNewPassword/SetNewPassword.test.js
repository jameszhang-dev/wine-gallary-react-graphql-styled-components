import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import SetNewPassword from './SetNewPassword';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<SetNewPassword />);
});
