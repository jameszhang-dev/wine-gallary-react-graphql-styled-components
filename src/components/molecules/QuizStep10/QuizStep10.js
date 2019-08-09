import React from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import {
  QuizHolder, QuizHeader, QuizBody, QuizFooter,
} from '../..';

import quizImageWave from '../../../assets/images/elements/quiz-wave-step-10.svg';
import quizBtnNext from '../../../assets/images/icons/arrow-right.svg';

const StyledQuizHolder = styled(QuizHolder)`
  background-color: ${colors.coral};
  &:before {
    height: 80%;
    background-image: url(${quizImageWave});
  }
`;

const StyledQuizContainer = styled.div`
  ${breakpoints.smUp} {
    width: 100%;
    text-align: center;
    max-width: 700px;
  }
  ${breakpoints.mdUp} {
    max-width: 900px;
  }
  ${breakpoints.lgUp} {
    max-width: 1100px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  margin: 0 auto;
  position: relative;
  flex: 1;
`;

const StyledQuizTitle = styled.p`
  font-size: 35px;
  font-family: ${fonts.fontInterstateBlackCompressed};
  margin: 0;
  line-height: 1.1;
  ${breakpoints.smDown} {
    font-size: 30px;
    margin: 0;
  }
`;

const StyledQuizTitleBreak = styled.br`
  display: inline-block;
  ${breakpoints.smDown} {
    display: none;
  }
`;

const StyledQuizBtnNext = styled.button`
  padding: 5px;
  background: transparent;
  border: none;
  width: 34px;
  display: inline-block;
  flex-shrink: 0;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledQuizBtnPrevBody = styled(StyledQuizBtnNext)`
  ${breakpoints.smDown} {
    display: none;
  }
`;

const StyledQuizBtnPrevFooter = styled(StyledQuizBtnNext)`
  ${breakpoints.smUp} {
    display: none;
  }
`;

const StyledQuizBtnBackIcon = styled.img`
  width: 100%;
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

const QuizStep10 = () => (
  <StyledQuizHolder>
    <QuizHeader />
    <QuizBody>
      <StyledQuizContainer>
        <StyledQuizTitle>
            You’re doing really well, only a few
          <StyledQuizTitleBreak />
          {' '}
important questions left.
        </StyledQuizTitle>
        <StyledQuizBtnPrevBody>
          <StyledQuizBtnBackIcon src={quizBtnNext} alt="iconNext" />
        </StyledQuizBtnPrevBody>
      </StyledQuizContainer>
    </QuizBody>

    <QuizFooter>
      <StyledQuizFooterTitleDesktop>
          Click anywhere to continue
      </StyledQuizFooterTitleDesktop>

      <StyledQuizFooterTitleMobile>
          Tap anywhere to continue
        <StyledQuizBtnPrevFooter>
          <StyledQuizBtnBackIcon src={quizBtnNext} alt="iconNext" />
        </StyledQuizBtnPrevFooter>
      </StyledQuizFooterTitleMobile>
    </QuizFooter>
  </StyledQuizHolder>
);

export default QuizStep10;
