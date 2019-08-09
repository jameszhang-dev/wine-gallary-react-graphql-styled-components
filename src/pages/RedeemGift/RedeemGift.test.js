import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import RedeemGift from './RedeemGift';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<RedeemGift />);
});
