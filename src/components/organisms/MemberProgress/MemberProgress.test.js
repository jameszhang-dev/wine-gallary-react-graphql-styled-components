import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import MemberProgress from './MemberProgress';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<MemberProgress />);
});
