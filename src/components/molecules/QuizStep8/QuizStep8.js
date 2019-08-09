import React from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import {
  ButtonOutline,
  QuizHolder,
  QuizHeader,
  QuizBody,
  QuizSlider,
  QuizSliderItem,
} from '../..';

import quizImageWave from '../../../assets/images/elements/quiz-wave-step-8.svg';
import quizBtnBack from '../../../assets/images/icons/arrow-left.svg';
import quizSliderImg1 from '../../../assets/images/temp/quiz-shoe.svg';
import quizSliderImg2 from '../../../assets/images/temp/quiz-pot.svg';

const StyledQuizHolder = styled(QuizHolder)`
  background-color: ${colors.white};
  &:before {
    height: 35%;
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
  font-size: 25px;
  font-family: ${fonts.fontBauRegular};
  margin: 0 0 130px 0;
  line-height: 1.4;
  ${breakpoints.smDown} {
    font-size: 18px;
    margin: 0 0 25px 0;
  }
`;

const StyledQuizSliderGrid = styled.div`
  ${breakpoints.smUp} {
    display: flex;
    align-items: flex-start;
  }
`;

const StyledQuizSliderHolder = styled.div`
  ${breakpoints.smUp} {
    order: 2;
  }
  flex: 1;
  display: block;
  ${breakpoints.smDown} {
    margin-bottom: 70px;
  }
`;

const StyledQuizSliderInner = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  margin-bottom: 80px;
`;

const StyledQuizSliderImage = styled.img`
  width: 60px;
  flex-shrink: 0;
  margin-top: 60px;
  ${breakpoints.xsDown} {
    display: none;
  }
`;

const StyledQuizSliderBtn = styled(ButtonOutline)`
  border-color: ${colors.white};
  box-shadow: 0px 0px 0px 1px ${colors.silver} inset;
  background-color: transparent;
  color: ${colors.black};
  font-size: 35px;
  text-transform: none;
  padding: 48px 100px;
  ${breakpoints.xsDown} {
    padding: 48px 15px;
    width: 100%;
  }
  &:hover,
  &:focus {
    background-color: ${colors.black};
    color: ${colors.white};
    border-color: ${colors.black};
    box-shadow: 0px 0px 0px 1px ${colors.black} inset;
  }
`;

const StyledQuizSliderImageLeft = styled(StyledQuizSliderImage)`
  margin-right: 20px;
`;

const StyledQuizSliderImageRight = styled(StyledQuizSliderImage)`
  margin-left: 20px;
`;

const StyledQuizBtnBack = styled.button`
  padding: 5px;
  background: transparent;
  border: none;
  width: 34px;
  display: inline-block;
  flex-shrink: 0;
  ${breakpoints.smUp} {
    margin-right: 105px;
    margin-top: 70px;
  }
`;

const StyledQuizBtnBackIcon = styled.img`
  width: 100%;
`;

const QuizStep8 = () => (
  <StyledQuizHolder>
    <QuizHeader />
    <QuizBody>
      <StyledQuizContainer>
        <StyledQuizTitle>
            Do you like a slender, medium or full bodied lover? I mean
            wine. Wine?
        </StyledQuizTitle>

        <StyledQuizSliderGrid>
          <StyledQuizSliderHolder>
            <StyledQuizSliderInner>
              <StyledQuizSliderImageLeft
                src={quizSliderImg1}
                alt="quizSliderImg1"
              />

              <QuizSlider>
                <QuizSliderItem>Slender</QuizSliderItem>
                <QuizSliderItem active>Medium</QuizSliderItem>
                <QuizSliderItem>Full</QuizSliderItem>
              </QuizSlider>

              <StyledQuizSliderImageRight
                src={quizSliderImg2}
                alt="quizSliderImg2"
              />
            </StyledQuizSliderInner>

            <StyledQuizSliderBtn as="a" href="/">
                Not sure
            </StyledQuizSliderBtn>
          </StyledQuizSliderHolder>

          <StyledQuizBtnBack type="button">
            <StyledQuizBtnBackIcon
              src={quizBtnBack}
              alt="quizBtnBack"
            />
          </StyledQuizBtnBack>
        </StyledQuizSliderGrid>
      </StyledQuizContainer>
    </QuizBody>
  </StyledQuizHolder>
);

export default QuizStep8;
