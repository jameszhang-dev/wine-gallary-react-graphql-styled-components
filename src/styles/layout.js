import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

import Header from '../components/organisms/Header/Header';
import Footer from '../components/organisms/Footer/Footer';
import {
  colors,
  typography,
  transition,
  baseColors,
  header,
} from './variables';

import breakpoints from './breakpoints';

const GlobalStyle = createGlobalStyle`
  *, &:before, &:after {
    box-sizing: border-box;
  }
  html,
  body {
    font-family: ${typography.baseFontFamily};
    font-size: ${typography.baseFontSize};
    margin: 0;
    padding: 0;
    height: 100%;
    color: ${colors.baseColor};
    line-height: ${typography.baseLineHeight};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch
  }
  body {
    overflow-x: hidden;
    ${breakpoints.mdUp} {
      padding-top: ${header.desktopHeight};
    }
    ${breakpoints.mdDown} {
      padding-top: ${header.mobileHeight};
    }
  }
  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  header, footer {
    flex-shrink: 0;
  }
  .content {
    flex: 1;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    margin-top: 0;
    margin-bottom: 20px;
    font-family: ${typography.titleFontFamily}, sans-serif;
    line-height: ${typography.titleLineHeight};
    &:last-child {
      margin-bottom: 0;
    }
  }

  h1,
  .h1 {
    font-size: 51px;
  }
  h2,
  .h2 {
    font-size: 45px;
  }
  h3,
  .h3 {
    font-size: 36px;
  }
  h4,
  .h4 {
    font-size: 26px;
  }
  h5,
  .h5 {
    font-size: 18px;
  }
  h6,
  .h6 {
    font-size: 14px;
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

  ul {
    padding: 0;
  }

  b, .bold {
    font-family: ${typography.baseFontMedium};
  }
`;

const Layout = props => {
  const { children } = props;
  return (
    <Fragment>
      <Normalize />
      <GlobalStyle />
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
