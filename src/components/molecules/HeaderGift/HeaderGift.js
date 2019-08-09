import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const StyledHeaderGift = styled.div`
  background-color: ${colors.coral};
  margin-top: 83px;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
`;

const StyledHeaderGiftContainer = styled.div`
  position: relative;
  height: 35px;
  
`;

export const HeaderGiftTitle = styled.h1`
  font-size: 20px;
  text-transform: uppercase;
  color: black;
`;



export const HeaderGift = props => {
  const { children } = props;
  return (
    <StyledHeaderGift>
      <StyledHeaderGiftContainer>{children}</StyledHeaderGiftContainer>
    </StyledHeaderGift>
  );
}
