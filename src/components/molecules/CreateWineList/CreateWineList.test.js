import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import CreateWineList from './CreateWineList';

it('renders without crashing', () => {
  const mockedMemberId = 100;

  const renderer = new ShallowRenderer();
  renderer.render(<CreateWineList memberId={mockedMemberId} />);
});
