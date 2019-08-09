import React from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import {
  QuizHolder,
  QuizCards,
  QuizCard,
  QuizCardTitle,
  QuizHeader,
  QuizBody,
} from '../..';

import quizImageWave from '../../../assets/images/elements/quiz-wave-step-5.svg';
import quizBtnBack from '../../../assets/images/icons/arrow-left.svg';
import quizShoeImg from '../../../assets/images/temp/quiz-shoe.svg';

const StyledQuizHolder = styled(QuizHolder)`
  background-color: ${colors.white};
  &:before {
    height: 30%;
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
  ${breakpoints.xsDown} {
    font-size: 18px;
  }
`;

const StyledQuizCard = styled(QuizCard)`
  ${breakpoints.smUp} {
    padding-top: 80px;
    padding-bottom: 80px;
  }
`;

const StyledQuizCardImg = styled.img`
  position: absolute;
  width: 65px;
  z-index: 1;
  ${breakpoints.xsDown} {
    width: 55px;
  }
`;

const StyledQuizCardImg1 = styled(StyledQuizCardImg)`
  ${breakpoints.smUp} {
    top: 50px;
  }
  ${breakpoints.mdUp} {
    top: 100px;
  }
  ${breakpoints.smDown} {
    left: 60px;
    top: 10px;
  }
`;

const StyledQuizCardImg2 = styled(StyledQuizCardImg)`
  left: 10px;
  bottom: 50px;
  ${breakpoints.smDown} {
    left: 0px;
    bottom: 50%;
    transform: translateY(50%);
  }
`;

const StyledQuizCardImg3 = styled(StyledQuizCardImg)`
  right: 10px;
  bottom: 30px;
  ${breakpoints.smDown} {
    left: auto;
    right: 10px;
  }
`;

const StyledQuizBtnBack = styled.button`
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

const StyledQuizBtnBackIcon = styled.img`
  width: 100%;
`;

const QuizStep5 = () => (
  <StyledQuizHolder>
    <QuizHeader />
    <QuizBody>
      <StyledQuizContainer>
        <StyledQuizTitle>
            How do you feel about these little things we like to call
            tannins?
        </StyledQuizTitle>

        <QuizCards>
          <StyledQuizCard href="/">
            <QuizCardTitle>
                I prefer soft, silky wines
            </QuizCardTitle>
            <StyledQuizCardImg1
              src={quizShoeImg}
              alt="quizShoeImg"
            />
          </StyledQuizCard>

          <StyledQuizCard href="/">
            <QuizCardTitle>
                Don’t mind a bit of astringency, but always in balance
            </QuizCardTitle>
            <StyledQuizCardImg2
              src={quizShoeImg}
              alt="quizShoeImg"
            />
          </StyledQuizCard>

          <StyledQuizCard href="/">
            <QuizCardTitle>
                I love those dry, grippy, high tannin wines
            </QuizCardTitle>
            <StyledQuizCardImg3
              src={quizShoeImg}
              alt="quizShoeImg"
            />
          </StyledQuizCard>

          <StyledQuizCard href="/">
            <QuizCardTitle>Not sure</QuizCardTitle>
          </StyledQuizCard>

          <StyledQuizBtnBack type="button">
            <StyledQuizBtnBackIcon
              src={quizBtnBack}
              alt="quizBtnBack"
            />
          </StyledQuizBtnBack>
        </QuizCards>
      </StyledQuizContainer>
    </QuizBody>
  </StyledQuizHolder>
);

export default QuizStep5;
