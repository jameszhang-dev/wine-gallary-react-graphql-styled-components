import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import GiftMemberForm from './GiftMemberForm';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<GiftMemberForm />);
});
