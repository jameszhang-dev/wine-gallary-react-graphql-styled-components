import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';

import Login from './Login';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <BrowserRouter>
      <Login location={{}} />
    </BrowserRouter>
  );
});
