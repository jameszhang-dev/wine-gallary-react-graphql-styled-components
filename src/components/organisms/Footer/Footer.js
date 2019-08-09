import React from 'react';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

import {
  Container,
  FooterLogo,
  FooterContent,
  FooterNavbar,
} from '../..';

const StyledFooter = styled.footer`
  background-color: ${colors.coral};
  padding: 70px 0;
  ${breakpoints.mdDown} {
    padding: 20px 0 80px 0;
  }
`;

const StyledFooterContainer = styled(Container)`
  ${breakpoints.mdUp} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledFooterTopHolder = styled.div`
  ${breakpoints.mdDown} {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledFooterTopHolderNavbar = styled(FooterNavbar)`
  ${breakpoints.mdUp} {
    display: none;
  }
  text-align: right;
`;

const StyledFooterCopyrightText = styled.p`
  ${breakpoints.mdUp} {
    display: none;
  }
  text-align: center;
  margin-top: 50px;
  font-size: 10px;
  font-family: ${fonts.fontBauMedium};
`;

const Footer = () => (
  <StyledFooter>
    <StyledFooterContainer>
      <StyledFooterTopHolder>
        <FooterLogo />
        <StyledFooterTopHolderNavbar />
      </StyledFooterTopHolder>

      <FooterContent />

      <StyledFooterCopyrightText>
        © Good Pair Days. All rights reserved.
      </StyledFooterCopyrightText>
    </StyledFooterContainer>
  </StyledFooter>
);

export default Footer;
