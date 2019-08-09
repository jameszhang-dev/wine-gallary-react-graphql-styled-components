import React, { Component } from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import { QuizHolder, QuizHeader, QuizBody } from '../..';

import quizImage from '../../../assets/images/temp/quiz-images-step1.svg';
import quizBtnSubmitIcon from '../../../assets/images/icons/arrow-right.svg';

const StyledQuizHolder = styled(QuizHolder)`
  background-color: ${colors.peach};
`;

const StyledQuizContainer = styled.div`
  ${breakpoints.smUp} {
    text-align: center;
  }
  max-width: 410px;
  padding: 0 15px;
  margin: 0 auto;
`;

const StyledQuizImage = styled.img`
  width: 100%;
  max-width: 240px;
  position: relative;
  z-index: 20;
  display: block;
  margin: 0 auto;
`;

const StyledQuizTitle = styled.h1`
  text-transform: uppercase;
  font-size: 50px;
  font-family: ${fonts.fontInterstateUltraBlack};
  margin: -20px 0px 70px 0px;
  ${breakpoints.xsDown} {
    margin-top: -12px;
    font-size: 30px;
  }
`;

const StyledQuizLabel = styled.label`
  font-size: 25px;
  margin: 0px 0px 25px 0px;
  font-family: ${fonts.fontBauRegular};
  font-weight: normal;
  display: inline-block;
  ${breakpoints.xsDown} {
    font-size: 18px;
  }
`;

const StyledQuizInputHolder = styled.div`
  position: relative;
`;

const StyledQuizInput = styled.input`
  width: 100%;
  border: 1px solid ${colors.black};
  height: 60px;
  background-color: transparent;
  padding: 5px 60px 5px 15px;
  font-family: ${fonts.fontBauRegular};
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 0;
  &:focus {
    outline: none;
    background-color: ${colors.white};
    border: 1px solid ${colors.white};
  }
`;

const StyledQuizBtnSubmit = styled.button`
  padding: 5px;
  background: transparent;
  border: none;
  width: 34px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledQuizBtnSubmitIcon = styled.img`
  width: 100%;
`;

class QuizStep1 extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.currentTarget.value });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <StyledQuizHolder>
        <QuizHeader />
        <QuizBody>
          <StyledQuizContainer>
            <StyledQuizImage src={quizImage} alt="quizImage" />
            <StyledQuizTitle>
              Let’s start by getting on a first name basis
            </StyledQuizTitle>

            <form>
              <StyledQuizLabel htmlFor="StyledQuizInput">
                What’s your first name?
              </StyledQuizLabel>
              <StyledQuizInputHolder>
                <StyledQuizInput
                  value={inputValue}
                  onChange={this.handleInputChange}
                  id="StyledQuizInput"
                  type="name"
                />
                <StyledQuizBtnSubmit type="submit">
                  <StyledQuizBtnSubmitIcon src={quizBtnSubmitIcon} />
                </StyledQuizBtnSubmit>
              </StyledQuizInputHolder>
            </form>
          </StyledQuizContainer>
        </QuizBody>
      </StyledQuizHolder>
    );
  }
}

export default QuizStep1;
