import React from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import {
  QuizHolder,
  QuizHeader,
  QuizBody,
  QuizCards,
  QuizCard,
  QuizCardTitle,
} from '../..';

import quizImageWave from '../../../assets/images/elements/quiz-wave-step-3.svg';
import quizBtnBack from '../../../assets/images/icons/arrow-left.svg';
import quizImage1 from '../../../assets/images/temp/quiz-images-step3-1.svg';
import quizImage2 from '../../../assets/images/temp/quiz-images-step3-2.svg';
import quizImage3 from '../../../assets/images/temp/quiz-images-step3-3.svg';

const StyledQuizHolder = styled(QuizHolder)`
  background-color: ${colors.white};
  &:before {
    height: 20%;
    background-image: url(${quizImageWave});
  }
`;

const StyledQuizContainer = styled.div`
  ${breakpoints.smUp} {
    text-align: center;
    max-width: 700px;
    display: flex;
    flex-direction: column;
  }
  ${breakpoints.mdUp} {
    max-width: 900px;
  }
  ${breakpoints.lgUp} {
    max-width: 1100px;
  }
  padding: 0 15px;
  margin: 0 auto;
  position: relative;
  flex: 1;
`;

const StyledQuizTitle = styled.p`
  ${breakpoints.mdUp} {
    margin-top: 100px;
  }
  font-size: 25px;
  font-family: ${fonts.fontBauRegular};
  margin: 0 0 40px 0;
  line-height: 1.4;
  flex: 1;
  ${breakpoints.smDown} {
    font-size: 18px;
    margin: 0 0 25px 0;
  }
`;

const StyledQuizTitleBr = styled.br`
  ${breakpoints.smUp} {
    display: inline-block;
  }
  display: none;
`;

const StyledQuizCards = styled(QuizCards)`
  ${breakpoints.smUp} {
    margin-bottom: 100px;
  }
`;

const StyledQuizCardImg = styled.img`
  position: absolute;
  max-width: 100%;
`;

const StyledQuizCardImg1 = styled(StyledQuizCardImg)`
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  bottom: 0;
  ${breakpoints.smDown} {
    transform: translateX(0%) translateY(0%);
    left: auto;
    right: 10px;
    width: 40px;
  }
`;

const StyledQuizCardImg2 = styled(StyledQuizCardImg)`
  left: 20px;
  transform: translateY(50%);
  bottom: 0;
  ${breakpoints.smDown} {
    transform: translateX(0%) translateY(0%);
    width: 90px;
    left: 10px;
  }
`;

const StyledQuizCardImg3 = styled(StyledQuizCardImg)`
  left: 50%;
  transform: translateX(-50%) translateY(65%);
  bottom: 0;
  ${breakpoints.smDown} {
    transform: translateX(0%) translateY(0%);
    left: auto;
    right: 10px;
    width: 40px;
  }
`;

const StyledQuizCardBtnBack = styled.button`
  padding: 5px;
  background: transparent;
  border: none;
  width: 34px;
  display: inline-block;
  ${breakpoints.smUp} {
    flex-shrink: 0;
    order: 1;
    margin-right: 20px;
  }
  ${breakpoints.lgUp} {
    margin-right: 70px;
  }
  ${breakpoints.smDown} {
    margin-top: 35px;
  }
`;

const StyledQuizCardBtnBackIcon = styled.img`
  width: 100%;
`;

const QuizStep3 = () => (
  <StyledQuizHolder>
    <QuizHeader />
    <QuizBody>
      <StyledQuizContainer>
        <StyledQuizTitle>
            We want to make sure we’re speaking your language, to help
            with this
          <StyledQuizTitleBr />
            would you consider yourself:
        </StyledQuizTitle>

        <StyledQuizCards>
          <QuizCard href="/">
            <QuizCardTitle>A newbie to wine</QuizCardTitle>
            <StyledQuizCardImg1 src={quizImage1} alt="quizImage1" />
          </QuizCard>

          <QuizCard href="/">
            <QuizCardTitle>
                Someone who knows a bit, but would love to learn more
            </QuizCardTitle>
            <StyledQuizCardImg2 src={quizImage2} alt="quizImage2" />
          </QuizCard>

          <QuizCard href="/">
            <QuizCardTitle>
                A budding wine connoisseur who knows their stuff
            </QuizCardTitle>
            <StyledQuizCardImg3 src={quizImage3} alt="quizImage3" />
          </QuizCard>

          <StyledQuizCardBtnBack type="button">
            <StyledQuizCardBtnBackIcon
              src={quizBtnBack}
              alt="quizBtnBack"
            />
          </StyledQuizCardBtnBack>
        </StyledQuizCards>
      </StyledQuizContainer>
    </QuizBody>
  </StyledQuizHolder>
);

export default QuizStep3;
