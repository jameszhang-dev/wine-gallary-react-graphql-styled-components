import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledQuizFooter = styled.div`
  flex-shrink: 0;
  text-align: center;
  padding: 20px 15px;
  position: relative;
`;

const QuizFooter = props => {
  const { children } = props;
  return <StyledQuizFooter>{children}</StyledQuizFooter>;
};

QuizFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuizFooter;
