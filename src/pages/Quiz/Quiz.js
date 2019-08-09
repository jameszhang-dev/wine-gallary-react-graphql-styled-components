import React, { Fragment } from 'react';

import { Normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

import { Quizzes } from '../../components';

import {
  fonts,
  transition,
  baseColors,
} from '../../styles/variables';

const GlobalStyle = createGlobalStyle`
  *, &:before, &:after {
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    font-family: ${fonts.fontBauRegular};
  }
  #root {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100%;
  }
  button,
  a {
    transition: ${transition.baseTransition};
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: ${baseColors.baseLinkColor};
    &:hover,
    &:focus {
      color: ${baseColors.baseLinkHoverColor};
      text-decoration: none;
    }
  }

  button {
    &:hover, &:focus {
      outline: none !important;
    }
  }

  p, ul {
    margin-top: 0;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Quiz = () => (
  <Fragment>
    <Normalize />
    <GlobalStyle />
    <Quizzes />
  </Fragment>
);

export default Quiz;
