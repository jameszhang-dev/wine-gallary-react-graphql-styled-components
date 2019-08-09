import React from 'react';
import styled from 'styled-components';

import { Button } from '../..';
import urlPatterns from '../../../urls';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const StyledHeaderSignInBox = styled.div`
  ${breakpoints.mdUp} {
    order: 3;
    margin-left: 20px;
    display: flex;
    align-items: center;
    min-width: 370px;
  }
  ${breakpoints.mdDown} {
    margin-left: auto;
  }
`;

const StyledHeaderSignInBoxBtn = styled(Button)`
  ${breakpoints.xsUp} {
    padding-left: 61px;
    padding-right: 61px;
  }
`;

const HeaderSignInHolder = styled.div`
  ${breakpoints.mdUp} {
    display: inline-block;
    justify-content: flex-end;
  }
  display: none;
  margin-right: 30px;
  text-align: right;
`;

const HeaderSignInText = styled.p`
  margin-bottom: 0px;
  color: ${colors.white};
  font-size: 12px;
`;

const HeaderSignInLink = styled.a`
  color: ${colors.black};
  font-size: 10px;
  text-transform: uppercase;
  font-family: ${fonts.fontBauMedium};
`;

const HeaderSignInBox = () => (
  <StyledHeaderSignInBox>
    <HeaderSignInHolder>
      <HeaderSignInText>Already have an account?</HeaderSignInText>
      <HeaderSignInLink href={urlPatterns.LOGIN}>Sign in</HeaderSignInLink>
    </HeaderSignInHolder>

    <StyledHeaderSignInBoxBtn as="a" href={urlPatterns.QUIZ}>
      Get started
    </StyledHeaderSignInBoxBtn>
  </StyledHeaderSignInBox>
);

export default HeaderSignInBox;
