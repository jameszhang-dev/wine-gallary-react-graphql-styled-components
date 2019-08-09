import React from 'react';
import styled from 'styled-components';

import breakpoints from '../../../styles/breakpoints';
import { HeaderLogo } from '../..';
import btnBackIcon from '../../../assets/images/icons/cancel.svg';

const StyledQuizHeader = styled.div`
  ${breakpoints.smUp} {
    margin-bottom: 20px;
  }
  flex-shrink: 0;
  padding: 40px 20px;
  text-align: center;
  position: relative;
  ${breakpoints.smDown} {
    padding: 20px 20px;
    margin-bottom: 20px;
  }
`;

const StyledQuizHeaderBtnBack = styled.a`
  ${breakpoints.smUp} {
    display: none;
  }
  display: inline-block;
  width: 12px;
  position: absolute;
  left: 20px;
  transform: translateY(-50%);
  top: 50%;
  z-index: 50;
`;

const StyledQuizHeaderBtnBackIcon = styled.img`
  width: 100%;
`;

const QuizHeader = () => (
  <StyledQuizHeader>
    <StyledQuizHeaderBtnBack href="/">
      <StyledQuizHeaderBtnBackIcon src={btnBackIcon} alt="Btn back" />
    </StyledQuizHeaderBtnBack>
    <HeaderLogo />
  </StyledQuizHeader>
);

export default QuizHeader;
