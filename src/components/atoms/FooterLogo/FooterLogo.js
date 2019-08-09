import React from 'react';
import styled from 'styled-components';

import logo from '../../../assets/images/elements/footerLogo.svg';
import breakpoints from '../../../styles/breakpoints';

const StyledFooterLogo = styled.a`
  display: inline-block;
  width: 127px;
  margin-right: 80px;
  flex-shrink: 0;
  ${breakpoints.mdDown} {
    width: 60px;
    margin-right: 20px;
  }
`;

const StyledFooterLogoImage = styled.img`
  display: block;
  width: 100%;
`;

const FooterLogo = () => (
  <StyledFooterLogo href="/">
    <StyledFooterLogoImage src={logo} alt="footerLogo" />
  </StyledFooterLogo>
);

export default FooterLogo;
