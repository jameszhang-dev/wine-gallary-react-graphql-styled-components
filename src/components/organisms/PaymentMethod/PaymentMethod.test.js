import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import PaymentMethod from './PaymentMethod';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<PaymentMethod />);
});
