import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const cartAlertPanelSize = '80px';

const StyledCartAlertPanel = styled.div`
  background-color: ${props => (props.blue ? colors.blue : colors.warning)};
  display: flex;
  align-items: center;
  justify-content: center;
  ${breakpoints.smUp} {
    flex-direction: column;
    width: ${cartAlertPanelSize};
    height: ${cartAlertPanelSize};
  }
  ${breakpoints.smDown} {
    width: 100%;
    justify-content: space-between;
    padding: 7.5px 15px;
  }
`;

const StyledCartAlertPanelTitle = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 2px;
  font-family: ${fonts.fontBauMedium};
`;

const StyledCartAlertPanelPrice = styled.p`
  font-size: 25px;
  text-transform: uppercase;
  font-family: ${fonts.fontInterstateBlackCompressed};
  line-height: 1;
`;

const CartAlertPanel = props => {
  const { title, price, blue } = props;
  return (
    <StyledCartAlertPanel blue={blue}>
      <StyledCartAlertPanelTitle>{title}</StyledCartAlertPanelTitle>
      <StyledCartAlertPanelPrice>
$
        {price}
      </StyledCartAlertPanelPrice>
    </StyledCartAlertPanel>
  );
};

CartAlertPanel.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  blue: PropTypes.bool,
};

CartAlertPanel.defaultProps = {
  title: 'Default title',
  price: 'Default price',
  blue: false,
};

export default CartAlertPanel;
