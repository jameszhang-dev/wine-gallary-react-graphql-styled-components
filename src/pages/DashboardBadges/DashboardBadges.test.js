import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import DashboardBadges from './DashboardBadges';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<DashboardBadges memberId={1} />);
});
