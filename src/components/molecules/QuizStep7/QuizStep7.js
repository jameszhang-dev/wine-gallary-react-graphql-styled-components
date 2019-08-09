import React from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import {
  Button,
  ButtonOutline,
  QuizHolder,
  QuizCheckbox,
  QuizHeader,
  QuizBody,
  QuizFooter,
  QuizChosenBox,
} from '../..';

import quizImageWave from '../../../assets/images/elements/quiz-wave-step-6.svg';
import quizBtnBack from '../../../assets/images/icons/arrow-left.svg';
import quizCheckboxImg1 from '../../../assets/images/temp/quiz-hand.svg';
import quizCheckboxImg2 from '../../../assets/images/temp/quiz-shoe.svg';
import quizCheckboxImg3 from '../../../assets/images/temp/quiz-pot.svg';
import quizCheckboxImg4 from '../../../assets/images/temp/quiz-dog.svg';
import quizCheckboxImg6 from '../../../assets/images/temp/quiz-hand-vertical.svg';
import quizCheckboxImg7 from '../../../assets/images/temp/quiz-dog-vertical.svg';

const StyledQuizHolder = styled(QuizHolder)`
  background-color: ${colors.white};
  &:before {
    height: 55%;
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
  margin: 0 0 40px 0;
  line-height: 1.4;
  ${breakpoints.smDown} {
    font-size: 18px;
    margin: 0 0 25px 0;
  }
`;

const QuizCheckboxesHolder = styled.div`
  ${breakpoints.smUp} {
    display: flex;
  }
`;

const QuizCheckboxes = styled.div`
  display: grid;
  justify-items: stretch;
  align-items: stretch;
  ${breakpoints.smUp} {
    flex: 1;
    order: 2;
  }
  ${breakpoints.mdUp} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
  ${breakpoints.mdDown} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }
`;

const QuizCheckboxesTitle = styled.h3`
  font-size: 35px;
  font-family: ${fonts.fontInterstateBlackCompressed};
  line-height: 1;
  margin: 0 0 5px 0;
  position: relative;
  z-index: 10;
`;

const QuizCheckboxesText = styled.p`
  font-size: 14px;
  font-family: ${fonts.fontConceptRegular};
  margin: 0;
  position: relative;
  z-index: 10;
`;

const StyledQuizCardImg = styled.img`
  position: absolute;
  z-index: 1;
`;

const StyledQuizCardImg1 = styled(StyledQuizCardImg)`
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  width: 45px;
`;

const StyledQuizCardImg2 = styled(StyledQuizCardImg)`
  left: 50%;
  transform: translateX(-50%);
  top: 25px;
  width: 65px;
`;

const StyledQuizCardImg3 = styled(StyledQuizCardImg)`
  ${breakpoints.smUp} {
    right: 20px;
    bottom: 30px;
    width: 55px;
  }
  ${breakpoints.smDown} {
    left: 50%;
    transform: translateX(-50%);
    top: 25px;
    width: 45px;
  }
`;

const StyledQuizCardImg4 = styled(StyledQuizCardImg)`
  ${breakpoints.smUp} {
    right: 0px;
    bottom: 30px;
    width: 65px;
  }
  ${breakpoints.smDown} {
    right: 0;
    top: 25px;
    width: 45px;
  }
`;

const StyledQuizCardImg5 = styled(StyledQuizCardImg)`
  ${breakpoints.smUp} {
    left: 20px;
    bottom: 20px;
    width: 55px;
  }
  ${breakpoints.smDown} {
    left: 50%;
    transform: translateX(-50%);
    top: 25px;
    width: 45px;
  }
`;

const StyledQuizCardImg6 = styled(StyledQuizCardImg)`
  ${breakpoints.smUp} {
    right: 0px;
    bottom: 30px;
    width: 85px;
  }
  ${breakpoints.smDown} {
    right: 0;
    top: 25px;
    width: 75px;
  }
`;

const StyledQuizCardImg7 = styled(StyledQuizCardImg)`
  ${breakpoints.smUp} {
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: 65px;
  }
  ${breakpoints.smDown} {
    left: 50%;
    transform: translateX(-50%);
    top: 15px;
    width: 65px;
  }
`;

const StyledQuizCardImg8 = styled(StyledQuizCardImg)`
  ${breakpoints.smUp} {
    left: 30px;
    bottom: 50px;
    width: 65px;
  }
  ${breakpoints.smDown} {
    left: 50%;
    transform: translateX(-50%);
    top: 25px;
    width: 65px;
  }
`;

const StyledQuizBtnBack = styled.button`
  padding: 5px;
  background: transparent;
  border: none;
  width: 34px;
  display: inline-block;
`;

const StyledQuizBtnBackDesktop = styled(StyledQuizBtnBack)`
  ${breakpoints.smUp} {
    flex-shrink: 0;
    order: 1;
    margin-right: 20px;
    margin-top: 130px;
    align-self: flex-start;
  }
  ${breakpoints.lgUp} {
    margin-right: 70px;
  }
  ${breakpoints.smDown} {
    display: none;
  }
`;

const StyledQuizBtnBackIcon = styled.img`
  width: 100%;
`;

const StyledFooterHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const StyledFooterHolderInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: relative;
  ${breakpoints.smDown} {
    justify-content: space-between;
  }
`;

const StyledFooterBtn = styled(Button)`
  padding: 21.5px 137px;
  ${breakpoints.smDown} {
    padding: 21.5px 15px;
    display: block;
    width: 100%;
  }
`;

const StyledQuizBtnBackFooter = styled(StyledQuizBtnBack)`
  ${breakpoints.smUp} {
    display: none;
  }
`;

const StyledQuizFooterBtnSkip = styled(ButtonOutline)`
  ${breakpoints.smUp} {
    display: none;
  }
  background-color: transparent;
  padding: 6.5px 26px;
`;

const QuizStep7 = () => (
  <StyledQuizHolder>
    <QuizHeader />
    <QuizBody>
      <StyledQuizContainer>
        <StyledQuizTitle>
            You’ve been given a magic everlasting fruit bowl but you
            can only choose three pieces of fruit to fill it. Which 3
            pieces do you choose?
        </StyledQuizTitle>

        <QuizCheckboxesHolder>
          <StyledQuizBtnBackDesktop type="button">
            <StyledQuizBtnBackIcon
              src={quizBtnBack}
              alt="quizBtnBack"
            />
          </StyledQuizBtnBackDesktop>

          <QuizCheckboxes>
            <QuizCheckbox>
              <QuizCheckboxesTitle>Black fruit</QuizCheckboxesTitle>
              <QuizCheckboxesText>Black plum</QuizCheckboxesText>
              <StyledQuizCardImg1
                src={quizCheckboxImg1}
                alt="quizCheckboxImg1"
              />
            </QuizCheckbox>

            <QuizCheckbox>
              <QuizCheckboxesTitle>Red fruit</QuizCheckboxesTitle>
              <QuizCheckboxesText>Cherry</QuizCheckboxesText>
              <StyledQuizCardImg2
                src={quizCheckboxImg2}
                alt="quizCheckboxImg2"
              />
            </QuizCheckbox>

            <QuizCheckbox>
              <QuizCheckboxesTitle>
                  Stone fruit
                {' '}
              </QuizCheckboxesTitle>
              <QuizCheckboxesText>Peach</QuizCheckboxesText>
              <StyledQuizCardImg3
                src={quizCheckboxImg3}
                alt="quizCheckboxImg3"
              />
            </QuizCheckbox>

            <QuizCheckbox>
              <QuizCheckboxesTitle>
                  Tropical fruit
              </QuizCheckboxesTitle>
              <QuizCheckboxesText>Lychee</QuizCheckboxesText>
              <StyledQuizCardImg4
                src={quizCheckboxImg4}
                alt="quizCheckboxImg4"
              />
            </QuizCheckbox>

            <QuizCheckbox>
              <QuizCheckboxesTitle>
                  Cirtus fruit
              </QuizCheckboxesTitle>
              <QuizCheckboxesText>Orange</QuizCheckboxesText>
              <StyledQuizCardImg5
                src={quizCheckboxImg3}
                alt="quizCheckboxImg3"
              />
            </QuizCheckbox>

            <QuizCheckbox>
              <QuizCheckboxesTitle>Dried fruit</QuizCheckboxesTitle>
              <QuizCheckboxesText>Fig</QuizCheckboxesText>
              <StyledQuizCardImg6
                src={quizCheckboxImg6}
                alt="quizCheckboxImg6"
              />
            </QuizCheckbox>

            <QuizCheckbox>
              <QuizCheckboxesTitle>Melon</QuizCheckboxesTitle>
              <QuizCheckboxesText>Rockmelon</QuizCheckboxesText>
              <StyledQuizCardImg7
                src={quizCheckboxImg7}
                alt="quizCheckboxImg7"
              />
            </QuizCheckbox>

            <QuizCheckbox>
              <QuizCheckboxesTitle>Tree fruit</QuizCheckboxesTitle>
              <QuizCheckboxesText>Apple</QuizCheckboxesText>
              <StyledQuizCardImg8
                src={quizCheckboxImg2}
                alt="quizCheckboxImg2"
              />
            </QuizCheckbox>
          </QuizCheckboxes>
        </QuizCheckboxesHolder>
      </StyledQuizContainer>
    </QuizBody>

    <QuizFooter>
      <StyledFooterHolder>
        <StyledFooterBtn as="a" href="/">
            Continue
        </StyledFooterBtn>

        <StyledFooterHolderInner>
          <StyledQuizBtnBackFooter type="button">
            <StyledQuizBtnBackIcon
              src={quizBtnBack}
              alt="quizBtnBack"
            />
          </StyledQuizBtnBackFooter>

          <QuizChosenBox>3/3 chosen</QuizChosenBox>

          <StyledQuizFooterBtnSkip>Skip</StyledQuizFooterBtnSkip>
        </StyledFooterHolderInner>
      </StyledFooterHolder>
    </QuizFooter>
  </StyledQuizHolder>
);

export default QuizStep7;
