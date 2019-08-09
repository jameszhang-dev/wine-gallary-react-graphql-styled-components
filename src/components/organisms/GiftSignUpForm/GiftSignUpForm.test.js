import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import GiftSignUpForm from './GiftSignUpForm';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<GiftSignUpForm />);
});
