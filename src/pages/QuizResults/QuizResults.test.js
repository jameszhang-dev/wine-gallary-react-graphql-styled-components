import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import QuizResults from './QuizResults';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<QuizResults history={{}} />);
});
