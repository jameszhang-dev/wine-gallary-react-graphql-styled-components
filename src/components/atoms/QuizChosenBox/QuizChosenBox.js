import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const StyledQuizChosenBox = styled.span`
  ${breakpoints.smUp} {
    border-radius: 20px;
    background-color: ${colors.white};
    padding: 13.5px 45px;
  }
  display: inline-block;
  font-size: 12px;
  font-family: ${fonts.fontBauRegular};
`;

const QuizChosenBox = props => {
  const { children } = props;

  return <StyledQuizChosenBox>{children}</StyledQuizChosenBox>;
};

QuizChosenBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuizChosenBox;
