import React from 'react';
import styled from 'styled-components';

import { header } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

import { CartAlertPanel } from '../..';

const StyledCartAlertHolder = styled.div`
  position: fixed;
  right: 0;
  top: ${header.desktopHeight};
  z-index: 500;
  ${breakpoints.smDown} {
    top: ${header.mobileHeight};
    width: 100%;
  }
`;

const CartAlert = () => (
  <StyledCartAlertHolder>
    <CartAlertPanel title="my box" price="58" />
    <CartAlertPanel blue title="cart" price="125" />
  </StyledCartAlertHolder>
);

export default CartAlert;
