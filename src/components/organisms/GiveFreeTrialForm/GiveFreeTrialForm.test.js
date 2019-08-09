import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import GiveFreeTrialForm from './GiveFreeTrialForm';

const me = { id: 1 };
const subscriptionGiveaway = { code: 'abc', url: 'https://test.testing' };
const counter = 1;

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <GiveFreeTrialForm me={me} subscriptionGiveaway={subscriptionGiveaway} counter={counter} />
  );
});
