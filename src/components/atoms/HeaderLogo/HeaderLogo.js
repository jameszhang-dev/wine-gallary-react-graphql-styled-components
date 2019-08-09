import React from 'react';

import styled from 'styled-components';

import logoImage from '../../../assets/images/elements/headerLogo.svg';
import breakpoints from '../../../styles/breakpoints';

const StyledHeaderLogo = styled.a`
  display: inline-block;
  width: 200px;
  margin-right: 15px;
  flex-shrink: 0;
  ${breakpoints.mdDown} {
    width: 140px;
  }
  ${breakpoints.smDown} {
    width: 150px;
  }
  ${breakpoints.xsDown} {
    width: 130px;
  }
`;

const StyledHeaderLogoImage = styled.img`
  display: block;
  width: 100%;
`;

const HeaderLogo = () => (
  <StyledHeaderLogo href="/">
    <StyledHeaderLogoImage src={logoImage} alt="Good Pair Days" />
  </StyledHeaderLogo>
);

export default HeaderLogo;
