import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { QuizAnswer } from '../..';

import './QuizQuestion.scss';

/**
 * Renders QuizQuestion component with possible Quiz Answers.
 * */
class QuizQuestion extends Component {
  static propTypes = {
    maxAnswers: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired, description: PropTypes.string.isRequired,
    })).isRequired,
    selectedAnswers: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleAnswerSelectParent: PropTypes.func.isRequired,
    sortOrder: PropTypes.number.isRequired,
  };

  /**
   * Handles selection of a specific Quiz Answer.
   *
   * @param {Object} event
   */
  handleAnswerSelection = event => {
    const {
      questionId, handleAnswerSelectParent, maxAnswers, sortOrder,
    } = this.props;

    const clickedAnswerId = parseInt(event.target.getAttribute('data-value'), 10);
    const selectedAnswersIds = this.getSelectedAnswersIds(clickedAnswerId);

    // Propagates new change to the parent if it's valid
    if (selectedAnswersIds.length <= maxAnswers) {
      handleAnswerSelectParent(questionId, maxAnswers, selectedAnswersIds, sortOrder);
    }
  };

  /**
   * Returns array of answers selected for a specific question including clickedAnswerId.
   *
   * @param {Number} clickedAnswerId
   * @returns {Array}
   */
  getSelectedAnswersIds = clickedAnswerId => {
    const { maxAnswers, selectedAnswers } = this.props;

    let newAnswersIds = [];
    if (selectedAnswers.includes(clickedAnswerId)) {
      newAnswersIds = selectedAnswers.filter(answerId => answerId !== clickedAnswerId);
    } else {
      newAnswersIds = [...selectedAnswers, clickedAnswerId];
      if (maxAnswers === 1) {
        newAnswersIds = newAnswersIds.slice(-1);
      }
    }
    return newAnswersIds;
  };

  render() {
    const { question, answers, selectedAnswers } = this.props;

    return (
      <div className="QuizQuestion">
        <div className="QuizQuestion--container">
          <div className="QuizQuestion--title">{question}</div>
          {answers.map(answer => (
            <QuizAnswer
              key={answer.id}
              id={answer.id}
              description={answer.description}
              isSelected={selectedAnswers.includes(answer.id)}
              handleAnswerSelection={this.handleAnswerSelection}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default QuizQuestion;
