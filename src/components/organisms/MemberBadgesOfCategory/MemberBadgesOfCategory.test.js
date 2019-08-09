import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import MemberBadgesOfCategory from './MemberBadgesOfCategory';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<MemberBadgesOfCategory memberId={1} badgeCategoryId={1} badgeCategoryName="Category" />);
});
