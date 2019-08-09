import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';

import {
  Container,
  HeaderDiscountMessage,
  HeaderLogo,
  HeaderMenu,
  HeaderSignInBox,
  HeaderLoggedIn,
} from '../..';
import { isLoggedIn } from '../../../helpers/auth';

import {
  colors,
  header,
  transition,
} from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const StyledHeader = styled.header`
  padding: 0;
  background-color: ${colors.coral};
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 600;
  ${breakpoints.mdUp} {
    min-height: ${header.desktopHeight};
  }
  ${breakpoints.mdDown} {
    padding: 10px 0;
    min-height: ${header.mobileHeight};
  }
`;

const StyledHeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  ${breakpoints.mdDown} {
    justify-content: flex-start;
  }
`;

const HeaderToggleMenuButton = styled.button`
  ${breakpoints.mdUp} {
    display: none;
  }
  display: inline-block;
  width: 14px;
  height: 12px;
  margin-right: 15px;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  border: none;
  background-color: transparent;
  &:hover,
  &:focus {
    box-shadow: none;
    outline: none;
  }
`;

const HeaderToggleMenuButtonInner = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 2px;
  background-color: ${props => (!props.mobileMenuIsOpen ? colors.black : 'transparent')};
  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 14px;
    height: 2px;
    background-color: ${colors.black};
    transition: ${transition.baseTransition};
  }
  &:before {
    top: ${props => (!props.mobileMenuIsOpen ? '-4px' : '50%')};
    transform: rotate(
        ${props => (!props.mobileMenuIsOpen ? '0deg' : '-45deg')}
      )
      translateY(
        ${props => (!props.mobileMenuIsOpen ? '0px' : '-50%')}
      );
  }
  &:after {
    bottom: ${props => (!props.mobileMenuIsOpen ? '-4px' : 'auto')};
    top: ${props => (!props.mobileMenuIsOpen ? 'auto' : '50%')};
    left: ${props => (!props.mobileMenuIsOpen ? '0' : '-1px')};
    transform: rotate(
        ${props => (!props.mobileMenuIsOpen ? '0deg' : '45deg')}
      )
      translateY(
        ${props => (!props.mobileMenuIsOpen ? '0px' : '-50%')}
      );
  }
`;

class Header extends Component {
  state = {
    mobileMenuIsOpen: false,
  };

  toggleMobileMenu = () => {
    this.setState(prevState => ({
      mobileMenuIsOpen: !prevState.mobileMenuIsOpen,
    }));
  };

  render() {
    const { mobileMenuIsOpen } = this.state;
    const isMemberLoggedIn = isLoggedIn();

    return (
      <StyledHeader>
        <StyledHeaderContainer>
          <HeaderToggleMenuButton
            type="button"
            onClick={this.toggleMobileMenu}
          >
            <HeaderToggleMenuButtonInner
              mobileMenuIsOpen={mobileMenuIsOpen}
            />
          </HeaderToggleMenuButton>
          <HeaderLogo />
          <HeaderDiscountMessage />

          {!isMemberLoggedIn ? <HeaderSignInBox /> : <HeaderLoggedIn />}

          <HeaderMenu
            mobileMenuIsOpen={mobileMenuIsOpen}
            isLoggedIn={isMemberLoggedIn}
          />
        </StyledHeaderContainer>
      </StyledHeader>
    );
  }
}

export default withRouter(Header);
