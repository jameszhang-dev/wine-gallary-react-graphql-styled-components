import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import PasswordReset from './PasswordReset';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<PasswordReset />);
});
