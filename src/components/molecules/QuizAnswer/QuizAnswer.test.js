import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import QuizAnswer from './QuizAnswer';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <QuizAnswer
      id={1}
      description="Red"
      isSelected
      handleAnswerSelection={() => null}
    />
  );
});
