import React, { Component } from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import {
  QuizHolder,
  Button,
  QuizHeader,
  QuizBody,
  QuizFooter,
  QuizChosenBox,
} from '../..';

import quizImageWave from '../../../assets/images/elements/quiz-wave-step-9.svg';
import quizBtnBack from '../../../assets/images/icons/arrow-left.svg';
import wineBottleRed from '../../../assets/images/elements/wine-red.svg';
import wineBottleWhite from '../../../assets/images/elements/wine-white.svg';
import wineBottleRose from '../../../assets/images/elements/wine-rose.svg';
import wineBottleSparkling from '../../../assets/images/elements/wine-sparkling.svg';

const StyledQuizHolder = styled(QuizHolder)`
  background-color: ${colors.white};
  &:before {
    height: 70%;
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
  margin: 0 0 80px 0;
  line-height: 1.4;
  ${breakpoints.smDown} {
    font-size: 18px;
    margin: 0 0 40px 0;
  }
`;

const StyledQuizTitleBreak = styled.br`
  display: inline-block;
  ${breakpoints.mdDown} {
    display: none;
  }
`;

const StyledQuizWinesHolder = styled.div`
  ${breakpoints.smUp} {
    display: flex;
  }
`;

const StyledQuizBtnBack = styled.button`
  padding: 5px;
  background: transparent;
  border: none;
  width: 34px;
  display: inline-block;
  flex-shrink: 0;
`;

const StyledQuizBtnBackDesktop = styled(StyledQuizBtnBack)`
  ${breakpoints.smUp} {
    margin-right: 105px;
    margin-top: 70px;
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

const StyledQuizBtnReset = styled.button`
  display: inline-block;
  text-transform: uppercase;
  font-size: 10px;
  font-family: ${fonts.fontBauMedium};
  border: none;
  background: transparent;
  margin-left: 10px;
`;

const Wines = styled.div`
  flex: 1;
  ${breakpoints.smUp} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: stretch;
    align-items: stretch;
  }
`;

const WineItem = styled.div`
  display: flex;
  align-items: center;
  ${breakpoints.smUp} {
    flex-direction: column;
  }
  &:not(:first-child) {
    ${breakpoints.smDown} {
      margin-top: 20px;
    }
  }
`;

const WineItemImage = styled.img`
  width: 100%;
  max-width: 60px;
  ${breakpoints.smUp} {
    margin-bottom: 40px;
  }
  ${breakpoints.smDown} {
    margin-right: 55px;
    margin-left: 40px;
    transform: rotate(45deg);
  }
`;

const WineItemTitle = styled.h6`
  text-transform: uppercase;
  font-size: 14px;
  font-family: ${fonts.fontInterstateUltraBlack};
  margin: 0 0 15px 0;
  ${breakpoints.smDown} {
    margin: 0;
  }
`;

const WineItemCounterHolder = styled.div`
  display: inline-flex;
  align-items: center;
  ${breakpoints.smDown} {
    margin-left: auto;
    flex-shrink: 0;
  }
`;
const WineItemCounterResult = styled.span`
  margin: 0 10px;
  font-size: 35px;
  line-height: 1;
  font-family: ${fonts.fontInterstateBlackCompressed};
`;

const WineItemCounterBtn = styled.button`
  border: none;
  background: transparent;
  color: ${colors.black};
  font-family: ${fonts.fontBauRegular};
  padding: 0;
  font-size: 22px;
`;

class QuizStep9 extends Component {
  state = {
    count: 0,
  };

  counterIncrement = e => {
    e.preventDefault();
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  counterDecrement = e => {
    e.preventDefault();
    this.setState(prevState => ({ count: prevState.count - 1 }));
  };

  render() {
    const { count } = this.state;

    return (
      <StyledQuizHolder>
        <QuizHeader />
        <QuizBody>
          <StyledQuizContainer>
            <StyledQuizTitle>
              You’ve got three likes to give. And three only. You can
              give them all to one
              <StyledQuizTitleBreak />
              or spread them out however you like. Which wine colour
              gets them?
            </StyledQuizTitle>

            <StyledQuizWinesHolder>
              <StyledQuizBtnBackDesktop type="button">
                <StyledQuizBtnBackIcon
                  src={quizBtnBack}
                  alt="quizBtnBack"
                />
              </StyledQuizBtnBackDesktop>

              <Wines>
                <WineItem>
                  <WineItemImage
                    src={wineBottleRed}
                    alt="wineBottleRed"
                  />
                  <WineItemTitle>Red</WineItemTitle>
                  <WineItemCounterHolder>
                    <WineItemCounterBtn
                      onClick={this.counterDecrement}
                    >
                      -
                    </WineItemCounterBtn>
                    <WineItemCounterResult>
                      {count}
                    </WineItemCounterResult>
                    <WineItemCounterBtn
                      onClick={this.counterIncrement}
                    >
                      +
                    </WineItemCounterBtn>
                  </WineItemCounterHolder>
                </WineItem>

                <WineItem>
                  <WineItemImage
                    src={wineBottleWhite}
                    alt="wineBottleWhite"
                  />
                  <WineItemTitle>White</WineItemTitle>
                  <WineItemCounterHolder>
                    <WineItemCounterBtn
                      onClick={this.counterDecrement}
                    >
                      -
                    </WineItemCounterBtn>
                    <WineItemCounterResult>
                      {count}
                    </WineItemCounterResult>
                    <WineItemCounterBtn
                      onClick={this.counterIncrement}
                    >
                      +
                    </WineItemCounterBtn>
                  </WineItemCounterHolder>
                </WineItem>

                <WineItem>
                  <WineItemImage
                    src={wineBottleRose}
                    alt="wineBottleRose"
                  />
                  <WineItemTitle>Rosé</WineItemTitle>
                  <WineItemCounterHolder>
                    <WineItemCounterBtn
                      onClick={this.counterDecrement}
                    >
                      -
                    </WineItemCounterBtn>
                    <WineItemCounterResult>
                      {count}
                    </WineItemCounterResult>
                    <WineItemCounterBtn
                      onClick={this.counterIncrement}
                    >
                      +
                    </WineItemCounterBtn>
                  </WineItemCounterHolder>
                </WineItem>

                <WineItem>
                  <WineItemImage
                    src={wineBottleSparkling}
                    alt="wineBottleSparkling"
                  />
                  <WineItemTitle>Sparkling</WineItemTitle>
                  <WineItemCounterHolder>
                    <WineItemCounterBtn
                      onClick={this.counterDecrement}
                    >
                      -
                    </WineItemCounterBtn>
                    <WineItemCounterResult>
                      {count}
                    </WineItemCounterResult>
                    <WineItemCounterBtn
                      onClick={this.counterIncrement}
                    >
                      +
                    </WineItemCounterBtn>
                  </WineItemCounterHolder>
                </WineItem>
              </Wines>
            </StyledQuizWinesHolder>
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

              <QuizChosenBox>
                3/3 chosen
                {' '}
                <StyledQuizBtnReset>reset</StyledQuizBtnReset>
              </QuizChosenBox>
            </StyledFooterHolderInner>
          </StyledFooterHolder>
        </QuizFooter>
      </StyledQuizHolder>
    );
  }
}

export default QuizStep9;
