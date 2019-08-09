import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../../styles/variables';

const StyledQuizSlider = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  text-align: center;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 20px;
    height: 1px;
    background-color: ${colors.black};
    width: 100%;
  }
`;

const QuizSlider = props => {
  const { children } = props;
  return <StyledQuizSlider>{children}</StyledQuizSlider>;
};

QuizSlider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuizSlider;
