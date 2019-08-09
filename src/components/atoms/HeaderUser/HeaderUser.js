import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';

import { colors, fonts, transition } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

import headerUserDropdownAvatar from '../../../assets/images/temp/dummy_1.svg';

const headerUserDropdownData = [
  {
    id: 'dashboard',
    title: 'My dashboard',
    href: '/',
    imageSrc: headerUserDropdownAvatar,
  },
  {
    id: 'box',
    title: 'My box',
    href: '/',
    imageSrc: headerUserDropdownAvatar,
  },
  {
    id: 'cellar',
    title: 'My cellar',
    href: '/',
    imageSrc: headerUserDropdownAvatar,
  },
  {
    id: 'profile',
    title: 'My profile',
    href: '/',
    imageSrc: headerUserDropdownAvatar,
  },
  {
    id: 'community',
    title: 'Community',
    href: '/',
    imageSrc: headerUserDropdownAvatar,
  },
  {
    id: 'settings',
    title: 'Settings',
    href: '/',
    imageSrc: headerUserDropdownAvatar,
  },
];

const StyledHeaderUserAvatar = styled.button`
  ${breakpoints.mdUp} {
    margin-right: 20px;
  }
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${colors.blue};
  font-family: ${fonts.fontInterstateBlackCompressed};
  border: none;
  text-transform: uppercase;
  padding: 0;
`;

const StyledHeaderUserDropdown = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  display: ${props => (props.dropdowIsOpen ? 'flex' : 'none')};
  flex-wrap: wrap;
  width: 100%;
  z-index: 60;
  transition: ${transition.baseTransition};
  ${breakpoints.mdUp} {
    display: flex;
    opacity: ${props => (props.dropdowIsOpen ? '1' : '0')};
    visibility: ${props => (props.dropdowIsOpen ? 'visible' : 'hidden')};
    transform: translateY(
      ${props => (props.dropdowIsOpen ? '0px' : '-15px')}
    );
  }
`;

const StyledHeaderUserDropdownItem = styled.a`
  ${breakpoints.smUp} {
    padding: 25px 15px;
    flex: 1;
  }
  ${breakpoints.mdUp} {
    padding: 35px 15px;
    flex-shrink: 0;
  }
  padding: 25px 15px;
  background-color: ${colors.peach};
  font-family: ${fonts.fontInterstateUltraBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-transform: uppercase;
  ${breakpoints.mdDown} {
    font-size: 10px;
  }
  ${breakpoints.smDown} {
    font-size: 14px;
    flex-basis: 50%;
    border-bottom: 1px solid ${colors.white};
  }
  &:not(:first-child) {
    ${breakpoints.smUp} {
      border-left: 1px solid ${colors.white};
    }
  }
  &:nth-child(even) {
    ${breakpoints.smDown} {
      border-left: 1px solid ${colors.white};
    }
  }
`;

const StyledHeaderUserDropdownItemAvatar = styled.img`
  width: 100%;
  max-width: 86px;
  display: block;
  margin-bottom: 25px;
`;

class HeaderUser extends Component {
  state = {
    dropdowIsOpen: false,
  };

  toggleDropdowMenu = e => {
    e.preventDefault();
    this.setState(prevState => ({
      dropdowIsOpen: !prevState.dropdowIsOpen,
    }));
  };

  handleChange = () => {
    this.setState(prevState => ({ isChecked: !prevState.isChecked }));
  };

  render() {
    const { dropdowIsOpen } = this.state;

    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({
            dropdowIsOpen: false,
          });
        }}
      >
        <StyledHeaderUserAvatar
          type="button"
          onClick={this.toggleDropdowMenu}
        >
          <span>A</span>
        </StyledHeaderUserAvatar>

        {headerUserDropdownData.length > 0 ? (
          <StyledHeaderUserDropdown dropdowIsOpen={dropdowIsOpen}>
            {headerUserDropdownData.map(headerUserDropdownItem => (
              <StyledHeaderUserDropdownItem
                href={headerUserDropdownItem.href}
                key={headerUserDropdownItem.id}
              >
                <StyledHeaderUserDropdownItemAvatar
                  src={headerUserDropdownItem.imageSrc}
                />
                {headerUserDropdownItem.title}
              </StyledHeaderUserDropdownItem>
            ))}
          </StyledHeaderUserDropdown>
        ) : null}
      </OutsideClickHandler>
    );
  }
}

export default HeaderUser;
