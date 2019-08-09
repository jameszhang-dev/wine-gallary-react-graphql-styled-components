import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import checkIcon from '../../../assets/images/icons/check-white.svg';

const StyledQuizSliderItem = styled.h5`
  position: relative;
  font-size: 35px;
  font-family: ${fonts.fontInterstateBlackCompressed};
  display: inline-block;
  padding-bottom: 66px;
  margin: 0;
  flex: 1;
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    border-radius: 50%;
    border: 1px solid ${colors.black};
    background-color: ${props => (props.active ? colors.black : colors.white)};
    background-image: url(${props => (props.active ? { checkIcon } : 'none')});
    width: 40px;
    height: 40px;
    z-index: 20;
  }
  &:before {
    ${({ active }) => active
      && `
    content: '';
  `}
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    background: url(${checkIcon}) no-repeat 50% 50%;
    width: 40px;
    height: 40px;
    z-index: 25;
  }
  &:first-child {
    text-align: left;
    &:after,
    &:before {
      left: 0;
      transform: translateX(0%);
    }
  }

  &:last-child {
    text-align: right;
    &:after,
    &:before {
      left: auto;
      right: 0;
      transform: translateX(0%);
    }
  }
`;

const QuizSliderItem = props => {
  const { active, children } = props;

  return (
    <StyledQuizSliderItem active={active}>
      {children}
    </StyledQuizSliderItem>
  );
};

QuizSliderItem.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

QuizSliderItem.defaultProps = {
  active: false,
};

export default QuizSliderItem;
