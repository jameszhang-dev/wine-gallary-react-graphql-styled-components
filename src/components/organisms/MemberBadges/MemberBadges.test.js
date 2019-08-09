import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import MemberBadges from './MemberBadges';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<MemberBadges />);
});
