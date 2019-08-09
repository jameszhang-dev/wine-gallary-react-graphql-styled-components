import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import WineRatingList from './WineRatingList';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<WineRatingList data={[]} />);
});
