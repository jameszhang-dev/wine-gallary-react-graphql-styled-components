import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';

import styled from 'styled-components';

import urlPatterns from '../../../urls';

import { fonts, colors, transition } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const StyledHeaderMenuList = styled.ul`
  list-style: none;
  ${breakpoints.mdUp} {
    display: flex;
    justify-content: center;
  }
`;

const StyledHeaderMenuItem = styled.li`
  &:not(:first-child) {
    ${breakpoints.mdUp} {
      margin-left: 20px;
    }
    ${breakpoints.mdDown} {
      margin-top: 15px;
    }
  }
`;

const StyledHeaderMenuItemHasDropdow = styled(StyledHeaderMenuItem)`
  position: relative;
  &:hover {
    &:after {
      opacity: 1;
      visibility: visible;
      transform: translateY(0px);
    }
  }
  &:after {
    ${breakpoints.mdUp} {
      transition: ${transition.baseTransition};
      content: '';
      position: absolute;
      left: -100vw;
      width: 200vw;
      height: 60px;
      bottom: -60px;
      background-color: ${colors.peach};
      z-index: 60;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-15px);
    }
  }
`;

const StyledHeaderMenuLink = styled.a`
  text-transform: uppercase;
  font-family: ${fonts.fontInterstateUltraBlack};
  display: inline-block;
  ${breakpoints.mdUp} {
    padding: 30.5px 0;
  }
  ${breakpoints.mdDown} {
    font-size: 25px;
    display: block;
  }
`;

const StyledHeaderMenuLinkMobileOnly = styled(StyledHeaderMenuLink)`
  ${breakpoints.mdUp} {
    display: none;
  }
`;

const StyledHeaderDropdownMenu = styled.div`
  z-index: 70;
  display: none;
  ${breakpoints.mdUp} {
    transition: ${transition.baseTransition};
    display: inline-flex;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: calc(100% + 16px);
    left: 0;
    transform: translateY(-15px);
  }
  ${breakpoints.mdDown} {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
  }
  ${StyledHeaderMenuItemHasDropdow}:hover & {
    ${breakpoints.mdUp} {
      transform: translateY(0px);
      display: inline-flex;
      opacity: 1;
      visibility: visible;
    }
  }
`;

const StyledHeaderDropdownMenuItem = styled.a`
  font-size: 20px;
  font-family: ${fonts.fontInterstateBlackCompressed};
  display: inline-block;
  &:not(:first-child) {
    ${breakpoints.mdUp} {
      margin-left: 20px;
    }
  }
  ${breakpoints.mdDown} {
    font-size: 25px;
    margin-top: 20px;
  }
`;

class HeaderNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = e => {
    e.preventDefault();
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { isOpen } = this.state;
    const { isLoggedIn } = this.props;

    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({
            isOpen: false,
          });
        }}
      >
        <StyledHeaderMenuList>
          <StyledHeaderMenuItem>
            <StyledHeaderMenuLink href={urlPatterns.WINES}>
              Wines
            </StyledHeaderMenuLink>
          </StyledHeaderMenuItem>

          <StyledHeaderMenuItem>
            <StyledHeaderMenuLink href={urlPatterns.GIFTS}>
              Gifts
            </StyledHeaderMenuLink>
          </StyledHeaderMenuItem>

          <StyledHeaderMenuItemHasDropdow>
            <StyledHeaderMenuLink onClick={this.toggle}>
              Discover
            </StyledHeaderMenuLink>

            <StyledHeaderDropdownMenu isOpen={isOpen}>
              <StyledHeaderDropdownMenuItem href="/">
                About
              </StyledHeaderDropdownMenuItem>
              <StyledHeaderDropdownMenuItem href="/">
                Blog
              </StyledHeaderDropdownMenuItem>
              <StyledHeaderDropdownMenuItem href="/">
                Reviews
              </StyledHeaderDropdownMenuItem>
            </StyledHeaderDropdownMenu>
          </StyledHeaderMenuItemHasDropdow>

          {isLoggedIn ? (
            <StyledHeaderMenuItem>
              <StyledHeaderMenuLinkMobileOnly>
                Log in
              </StyledHeaderMenuLinkMobileOnly>
            </StyledHeaderMenuItem>
          ) : (
            <StyledHeaderMenuItem>
              <StyledHeaderMenuLinkMobileOnly>
                Log out
              </StyledHeaderMenuLinkMobileOnly>
            </StyledHeaderMenuItem>
          )}
        </StyledHeaderMenuList>
      </OutsideClickHandler>
    );
  }
}

HeaderNavbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

HeaderNavbar.defaultProps = {
  isLoggedIn: false,
};

export default HeaderNavbar;
