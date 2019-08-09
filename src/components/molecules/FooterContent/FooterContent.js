import React from 'react';
import styled from 'styled-components';

import { fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

import { FooterNavbar, SocialList } from '../..';

const StyledFooterContent = styled.div`
  ${breakpoints.mdUp} {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
  ${breakpoints.mdDown} {
    margin-top: 30px;
    text-align: center;
  }
`;

const StyledFooterContentLeftPart = styled.div`
  ${breakpoints.mdUp} {
    flex-shrink: 0;
    margin-right: 25px;
    max-width: 470px;
  }
`;

const StyledFooterContentRightPart = styled.div`
  ${breakpoints.mdUp} {
    flex-shrink: 0;
  }
`;

const StyledFooterContentNavbar = styled(FooterNavbar)`
  ${breakpoints.mdDown} {
    display: none;
  }
`;

const StyledFooterContentInfoText = styled.p`
  font-size: 12px;
  margin-bottom: 15px;
`;

const StyledFooterCopyrightText = styled.p`
  font-size: 10px;
  font-family: ${fonts.fontBauMedium};
  ${breakpoints.mdDown} {
    display: none;
  }
`;

const StyledFooterContentTitle = styled.h3`
  font-size: 20px;
  font-family: ${fonts.fontInterstateBlackCompressed};
  margin-bottom: 5px;
`;

const StyledFooterContentEmail = styled.a`
  display: inline-block;
  margin-bottom: 20px;
`;

const FooterContent = () => (
  <StyledFooterContent>
    <StyledFooterContentLeftPart>
      <StyledFooterContentNavbar />
      <StyledFooterContentInfoText>
        Good Pair Days supports the responsible service of alcohol. It
        is against the law to sell or supply alcohol to, or obtain
        alcohol on behalf of, a person under the age of 18 years.
        License number LIQP770016794.
      </StyledFooterContentInfoText>
      <StyledFooterCopyrightText>
        © Good Pair Days. All rights reserved.
      </StyledFooterCopyrightText>
    </StyledFooterContentLeftPart>

    <StyledFooterContentRightPart>
      <StyledFooterContentTitle>Say hello</StyledFooterContentTitle>
      <StyledFooterContentEmail href="mailto:hello@goodpairdays.com">
        hello@goodpairdays.com
      </StyledFooterContentEmail>
      <SocialList />
    </StyledFooterContentRightPart>
  </StyledFooterContent>
);

export default FooterContent;
