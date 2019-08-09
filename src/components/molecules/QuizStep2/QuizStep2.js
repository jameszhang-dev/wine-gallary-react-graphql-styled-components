import React from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import { QuizHolder, QuizHeader, QuizBody } from '../..';

import quizImageWave from '../../../assets/images/elements/quiz-wave-step-2.svg';
import quizImage from '../../../assets/images/temp/quiz-images-step2.svg';

const StyledQuizHolder = styled(QuizHolder)`
  background-color: ${colors.coral};
  &:before {
    height: 10%;
    background-image: url(${quizImageWave});
  }
`;

const StyledQuizContainer = styled.div`
  ${breakpoints.smUp} {
    text-align: center;
  }
  max-width: 430px;
  padding: 0 15px;
  margin: 0 auto;
`;

const StyledQuizTitle = styled.h2`
  text-transform: uppercase;
  font-size: 50px;
  font-family: ${fonts.fontInterstateUltraBlack};
  margin: 0px;
  ${breakpoints.xsDown} {
    font-size: 30px;
  }
`;

const StyledQuizImage = styled.img`
  display: inline-block;
  width: 100%;
  max-width: 80px;
  margin-left: -40px;
  margin-bottom: -20px;
  ${breakpoints.xsDown} {
    max-width: 70px;
    margin-left: -25px;
    margin-bottom: -4px;
    margin-right: 10px;
  }
`;

const guesName = 'Teddy';

const QuizStep2 = () => (
  <StyledQuizHolder>
    <QuizHeader />
    <QuizBody>
      <StyledQuizContainer>
        <StyledQuizTitle>
            Nice
          {' '}
          <StyledQuizImage src={quizImage} alt="quizImage" />
            to pair with you
          {' '}
          {guesName}
        </StyledQuizTitle>
      </StyledQuizContainer>
    </QuizBody>
  </StyledQuizHolder>
);

export default QuizStep2;
