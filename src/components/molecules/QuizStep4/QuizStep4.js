import React from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import {
  QuizHolder, QuizHeader, QuizBody, QuizFooter,
} from '../..';

import quizImageWave from '../../../assets/images/elements/quiz-wave-step-4.svg';
import iconNext from '../../../assets/images/icons/arrow-right.svg';

const StyledQuizHolder = styled(QuizHolder)`
  background-color: ${colors.warning};
  &:before {
    height: 20%;
    background-image: url(${quizImageWave});
  }
`;

const StyledQuizContainer = styled.div`
  ${breakpoints.smUp} {
    text-align: center;
  }
  max-width: 410px;
  padding: 0 15px;
  margin: 0 auto;
`;

const StyledQuizTitle = styled.p`
  ${breakpoints.smUp} {
    transform: translateY(-50px);
  }
  font-size: 35px;
  font-family: ${fonts.fontInterstateBlackCompressed};
  margin: 0;
  line-height: 1.1;
  ${breakpoints.xsDown} {
    font-size: 28px;
  }
`;

const StyledQuizFooterTitleDesktop = styled.p`
  font-size: 12px;
  margin: 0;
  font-family: ${fonts.fontBauRegular};
  position: relative;
  ${breakpoints.smDown} {
    display: none;
  }
`;

const StyledQuizFooterTitleMobile = styled(
  StyledQuizFooterTitleDesktop
)`
  ${breakpoints.smUp} {
    display: none;
  }
  ${breakpoints.smDown} {
    display: block;
  }
`;

const StyledQuizCardBtnBackIcon = styled.img`
  width: 100%;
`;

const StyledQuizBtnNext = styled.button`
  ${breakpoints.smUp} {
    display: none;
  }
  padding: 5px;
  background: transparent;
  border: none;
  width: 34px;
  display: inline-block;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

const QuizStep4 = () => (
  <StyledQuizHolder>
    <QuizHeader />
    <QuizBody>
      <StyledQuizContainer>
        <StyledQuizTitle>
            That’s great. Let’s start with the basics and if you’d
            like to do some more advanced questions later on, you’ll
            get the chance.
        </StyledQuizTitle>
      </StyledQuizContainer>
    </QuizBody>
    <QuizFooter>
      <StyledQuizFooterTitleDesktop>
          Click anywhere to continue
      </StyledQuizFooterTitleDesktop>

      <StyledQuizFooterTitleMobile>
          Tap anywhere to continue
      </StyledQuizFooterTitleMobile>

      <StyledQuizBtnNext type="button">
        <StyledQuizCardBtnBackIcon src={iconNext} alt="iconNext" />
      </StyledQuizBtnNext>
    </QuizFooter>
  </StyledQuizHolder>
);

export default QuizStep4;
