import React from 'react';
import PropTypes from 'prop-types';

import './QuizAnswer.scss';

/**
 * Renders QuizAnswer component.
 * */
const QuizAnswer = props => {
  const {
    id, description, isSelected, handleAnswerSelection,
  } = props;

  return (
    <div className="QuizAnswer">
      <div
        tabIndex={id}
        role="button"
        onClick={handleAnswerSelection}
        onKeyPress={handleAnswerSelection}
        className={isSelected ? 'QuizAnswer--selected' : ''}
        key={id}
        data-value={id}
      >
        {description}
      </div>
    </div>
  );
};

QuizAnswer.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleAnswerSelection: PropTypes.func.isRequired,
};

export default QuizAnswer;
