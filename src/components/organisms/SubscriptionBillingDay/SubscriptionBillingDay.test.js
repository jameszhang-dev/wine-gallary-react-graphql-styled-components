import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import SubscriptionBillingDay from './SubscriptionBillingDay';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<SubscriptionBillingDay />);
});
