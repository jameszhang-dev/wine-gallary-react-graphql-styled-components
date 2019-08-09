import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { HeaderNavbar } from '../..';

import breakpoints from '../../../styles/breakpoints';

const StyledHeaderMenu = styled.div`
  ${breakpoints.mdUp} {
    flex: 1;
  }
  ${breakpoints.mdDown} {
    width: 100%;
    padding: 20px 33px;
    display: ${props => (props.mobileMenuIsOpen ? 'block' : 'none')};
  }
`;

const HeaderMenu = props => {
  const { mobileMenuIsOpen, isLoggedIn } = props;

  return (
    <StyledHeaderMenu mobileMenuIsOpen={mobileMenuIsOpen}>
      <HeaderNavbar isLoggedIn={isLoggedIn} />
    </StyledHeaderMenu>
  );
};

HeaderMenu.propTypes = {
  mobileMenuIsOpen: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

HeaderMenu.defaultProps = {
  mobileMenuIsOpen: false,
  isLoggedIn: false,
};

export default HeaderMenu;
