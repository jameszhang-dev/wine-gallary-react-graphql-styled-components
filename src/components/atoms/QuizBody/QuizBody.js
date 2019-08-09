import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledQuizBody = styled.div`
  margin-bottom: 30px;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuizBody = props => {
  const { children } = props;
  return <StyledQuizBody>{children}</StyledQuizBody>;
};

QuizBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuizBody;
