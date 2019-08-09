import React, { Component } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import {
  QuizHolder, QuizHeader, QuizBody, Button,
} from '../..';

import quizImageWave from '../../../assets/images/elements/quiz-wave-step-11.svg';
import quizBtnPrev from '../../../assets/images/icons/arrow-left.svg';
import bottlesDesktop from '../../../assets/images/elements/bottles-desktop.svg';
import bottlesMobile from '../../../assets/images/elements/bottles-mobile.svg';
import facebookIcon from '../../../assets/images/icons/facebook-login-icon.svg';
import googleIcon from '../../../assets/images/icons/google-login-icon.svg';
import calendarIcon from '../../../assets/images/icons/calendar.svg';

const StyledQuizHolder = styled(QuizHolder)`
  background-color: ${colors.white};
  &:before {
    height: 99%;
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
    max-width: 835px;
  }
  padding: 0 15px;
  margin: 0 auto;
  position: relative;
  flex: 1;
`;

const StyledQuizTitle = styled.p`
  font-size: 25px;
  font-family: ${fonts.fontInterstateUltraBlack};
  margin: 0 0 50px 0;
  line-height: 1.25;
  text-align: left;
  ${breakpoints.smDown} {
    margin: 0 0 25px 0;
  }
`;

const StyledQuizSubTitle = styled.p`
  font-size: 18px;
  font-family: ${fonts.fontBauRegular};
  margin: 0 0 40px 0;
  line-height: 1.35;
  text-align: left;
  ${breakpoints.smDown} {
    margin: 0 0 30px 0;
  }
`;

const StyledQuizBtnNext = styled.button`
  padding: 5px;
  background: transparent;
  border: none;
  width: 34px;
  display: inline-block;
  flex-shrink: 0;
`;

const StyledQuizBtnPrevBody = styled(StyledQuizBtnNext)`
  ${breakpoints.mdUp} {
    left: -20%;
  }
  position: absolute;
  left: 0;
  top: 200px;
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

const StyledBottlesImage = styled.img`
  display: block;
  width: 100%;
`;

const StyledBottlesImageDesktop = styled(StyledBottlesImage)`
  margin-bottom: 50px;
  ${breakpoints.xsDown} {
    display: none;
  }
`;

const StyledBottlesImageMobile = styled(StyledBottlesImage)`
  margin-bottom: 30px;
  width: 260px;
  margin-left: auto;
  margin-right: auto;
  ${breakpoints.xsUp} {
    display: none;
  }
`;

const StyledForm = styled.form`
  margin-bottom: 20px;
`;

const StyledFormRow = styled.div`
  ${breakpoints.smUp} {
    display: flex;
    align-items: center;
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const StyledInput = `
  height: 60px;
  padding: 10px 15px;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid ${colors.black};
  background-color: transparent;
  font-family: ${fonts.fontConceptRegular};

  ::-webkit-input-placeholder {
    color: ${colors.black};
    font-family: ${fonts.fontConceptRegular};
  }
  ::-moz-placeholder {
    color: ${colors.black};
    font-family: ${fonts.fontConceptRegular};
  }
  :-ms-input-placeholder {
    color: ${colors.black};
    font-family: ${fonts.fontConceptRegular};
  }
  :-moz-placeholder {
    color: ${colors.black};
    font-family: ${fonts.fontConceptRegular};
  }
  &:focus {
    outline: none;
  }
`;

const StyledFormInput = styled.input`
  ${StyledInput}
`;

const StyledDatepickerInputHolder = styled.div`
  display: flex;
  position: relative;
  ${breakpoints.smUp} {
    width: 50%;
  }

  input {
    ${StyledInput}
  }
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: block;
  }
  .react-datepicker {
    border-radius: 0;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    border: none;
  }
  .react-datepicker__header {
    border-radius: 0;
    background-color: ${colors.white};
    border: none;
  }
  .react-datepicker__triangle {
    display: none !important;
  }
  .react-datepicker-popper[data-placement^='top'] {
    top: 14px !important;
  }
  .react-datepicker-popper[data-placement^='bottom'] {
    top: -10px !important;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected {
    border-radius: 0;
    background-color: ${colors.white};
    border: 1px solid ${colors.black};
    color: ${colors.black};
    &:hover {
      background-color: ${colors.white};
      border: 1px solid ${colors.black};
      color: ${colors.black};
    }
  }
  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover {
    border-radius: 0;
  }
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    top: 5px;
    border-width: 0.25rem;
    border-top-color: ${colors.black};
  }
  .react-datepicker__navigation--previous {
    border-right-color: ${colors.black};
  }
  .react-datepicker__navigation--next {
    border-left-color: ${colors.black};
  }
`;

const StyledDatepickerIconHolder = styled.div`
  border-left: 1px solid ${colors.black};
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDatepickerIcon = styled.img`
  width: 20px;
`;

const StyledFormItem = styled.div`
  position: relative;
  flex: 1;
  &:not(:last-child) {
    ${breakpoints.smUp} {
      margin-right: 20px;
    }
    ${breakpoints.smDown} {
      margin-bottom: 20px;
    }
  }
`;

const StyledFormItemHasText = styled(StyledFormItem)`
  ${breakpoints.smUp} {
    display: flex;
    align-items: center;
  }
  ${StyledFormInput} {
    width: 50%;
  }
`;

const StyledFormTextBox = styled.div`
  flex-shrink: 0;
  flex: 1;
  ${breakpoints.smUp} {
    margin-right: 20px;
  }
  ${breakpoints.smDown} {
    margin-bottom: 10px;
  }
`;

const StyledFormText = styled.span`
  font-size: 11px;
  font-family: ${fonts.fontBauRegular};
  text-align: left;
  display: inline-block;
  line-height: 1.35;
`;

const StyledFormTextBold = styled.a`
  font-size: 10px;
  font-family: ${fonts.fontInterstateUltraBlack};
  text-transform: uppercase;
  line-height: 1.35;
`;

const StyledFormBtn = styled(Button)`
  display: block;
  width: 100%;
  font-size: 12px;
  padding: 12.5px 15px;
`;
const StyledFormBtnSubtitle = styled.span`
  display: block;
  font-size: 10px;
  font-family: ${fonts.fontBauRegular};
  text-transform: none;
`;

const StyledSignTitle = styled.h4`
  font-size: 20px;
  font-family: ${fonts.fontInterstateBlackCompressed};
  margin: 0 0 20px 0;
  text-align: center;
`;

const StyledSocialButtonsHolder = styled.div`
  margin: 0 0 20px 0;
  text-align: center;
`;

const StyledSocialButton = styled(Button)`
  &:not(:last-child) {
    margin-right: 10px;
  }
  background-color: ${colors.white};
  color: ${colors.black};
  border-color: ${colors.white};
  display: inline-flex;
  align-items: center;
  padding: 16px 25px;
  font-size: 12px;
  ${breakpoints.xsDown} {
    padding: 16px 18px;
  }
  &:hover,
  &:focus {
    background-color: ${colors.white};
    border-color: ${colors.white};
    color: ${colors.black};
  }
`;

const StyledSocialButtonIcon = styled.img`
  width: 100px;
  max-width: 24px;
  display: inline-block;
  margin-right: 14px;
  ${breakpoints.xsDown} {
    margin-right: 5px;
  }
`;

const StyledAlreadyHaveAccount = styled.p`
  margin: 20px 0 0 0;
  font-size: 12px;
  text-align: center;
`;

const StyledSignInLink = styled.a`
  font-family: ${fonts.fontInterstateUltraBlack};
  font-size: 11px;
  letter-spacing: 1.1px;
  text-transform: uppercase;
`;

class QuizStep11 extends Component {
  state = {
    startDate: new Date(),
  };

  handleChange = date => {
    this.setState({
      startDate: date,
    });
  };

  render() {
    const { startDate } = this.state;

    return (
      <StyledQuizHolder>
        <QuizHeader />
        <QuizBody>
          <StyledQuizContainer>
            <StyledQuizTitle>
              We got you! Here’s what we think you’ll generally like.
              Join us to see your first box of wines.
            </StyledQuizTitle>
            <StyledQuizBtnPrevBody>
              <StyledQuizBtnBackIcon
                src={quizBtnPrev}
                alt="quizBtnPrev"
              />
            </StyledQuizBtnPrevBody>

            <StyledBottlesImageDesktop
              src={bottlesDesktop}
              alt="bottlesDesktop"
            />
            <StyledBottlesImageMobile
              src={bottlesMobile}
              alt="bottlesMobile"
            />

            <StyledQuizSubTitle>
              You’ve got similar tastes to 1,898 of our current
              winesquad. That’s about 15% of us. Don’t worry if that
              doesn’t make sense yet, that’s what we’re here for.
            </StyledQuizSubTitle>

            <StyledForm>
              <StyledFormRow>
                <StyledFormItem>
                  <StyledFormInput
                    type="name"
                    placeholder="First name"
                  />
                </StyledFormItem>

                <StyledFormItem>
                  <StyledFormInput
                    type="name"
                    placeholder="Last name"
                  />
                </StyledFormItem>
              </StyledFormRow>

              <StyledFormRow>
                <StyledFormItem>
                  <StyledFormInput
                    type="email"
                    placeholder="Email address"
                  />
                </StyledFormItem>
              </StyledFormRow>

              <StyledFormRow>
                <StyledFormItem>
                  <StyledFormInput
                    type="password"
                    placeholder="Password"
                  />
                </StyledFormItem>

                <StyledFormItemHasText>
                  <StyledFormTextBox>
                    <StyledFormText>
                      We can only sell alcohol to persons 18 and over.
                      {' '}
                      <StyledFormTextBold href="/">
                        Our policies
                      </StyledFormTextBold>
                    </StyledFormText>
                  </StyledFormTextBox>

                  <StyledDatepickerInputHolder>
                    <DatePicker
                      selected={startDate}
                      onChange={this.handleChange}
                      showYearDropdown
                      dateFormatCalendar="MMMM"
                      scrollableYearDropdown
                      yearDropdownItemNumber={15}
                      placeholderText="Click to select a date"
                    />
                    <StyledDatepickerIconHolder>
                      <StyledDatepickerIcon
                        src={calendarIcon}
                        alt="calendarIcon"
                      />
                    </StyledDatepickerIconHolder>
                  </StyledDatepickerInputHolder>
                </StyledFormItemHasText>
              </StyledFormRow>

              <StyledFormRow>
                <StyledFormItem>
                  <StyledFormBtn type="submit">
                    create account
                    <StyledFormBtnSubtitle>
                      And see my subscription box!
                    </StyledFormBtnSubtitle>
                  </StyledFormBtn>
                </StyledFormItem>
              </StyledFormRow>
            </StyledForm>

            <StyledSignTitle>or sign up with</StyledSignTitle>

            <StyledSocialButtonsHolder>
              <StyledSocialButton>
                <StyledSocialButtonIcon
                  src={facebookIcon}
                  alt="facebookIcon"
                />
                Facebook
              </StyledSocialButton>

              <StyledSocialButton>
                <StyledSocialButtonIcon
                  src={googleIcon}
                  alt="googleIcon"
                />
                google
              </StyledSocialButton>
            </StyledSocialButtonsHolder>

            <StyledAlreadyHaveAccount>
              Already have an account?
              {' '}
              <StyledSignInLink href="/">Sign in</StyledSignInLink>
            </StyledAlreadyHaveAccount>

            <StyledQuizBtnPrevFooter>
              <StyledQuizBtnBackIcon
                src={quizBtnPrev}
                alt="quizBtnPrev"
              />
            </StyledQuizBtnPrevFooter>
          </StyledQuizContainer>
        </QuizBody>
      </StyledQuizHolder>
    );
  }
}

export default QuizStep11;
