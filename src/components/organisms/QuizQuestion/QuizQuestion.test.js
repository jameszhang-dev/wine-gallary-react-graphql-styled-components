import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import QuizQuestion from './QuizQuestion';

const MOCKED_ANSWERS = [
  { id: 1, description: 'Red' },
  { id: 2, description: 'White' },
];

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <QuizQuestion
      answers={MOCKED_ANSWERS}
      maxAnswers={1}
      questionId={1}
      question="White or Red?"
      selectedAnswers={[]}
      handleAnswerSelectParent={() => null}
      sortOrder={1}
    />
  );
});
