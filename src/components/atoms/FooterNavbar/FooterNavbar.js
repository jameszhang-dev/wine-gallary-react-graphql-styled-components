import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const footerMenuItems = [
  { id: 'faq', title: 'FAQs', url: '/' },
  { id: 'contact', title: 'Contact us', url: '/' },
  { id: 'terms', title: 'Terms & policies', url: '/' },
];

const StyledFooterMenuList = styled.ul`
  list-style: none;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
  ${breakpoints.mdUp} {
    display: flex;
  }
`;

const StyledFooterMenuItem = styled.li`
  &:not(:first-child) {
    ${breakpoints.mdUp} {
      margin-left: 20px;
    }
    ${breakpoints.mdDown} {
      margin-top: 5px;
    }
  }
`;

const StyledFooterMenuLink = styled.a`
  text-transform: uppercase;
  font-family: ${fonts.fontInterstateUltraBlack};
  font-size: 11px;
`;

const FooterMenuListItem = ({ data }) => (
  <StyledFooterMenuItem>
    <StyledFooterMenuLink href={data.url}>
      {data.title}
    </StyledFooterMenuLink>
  </StyledFooterMenuItem>
);

const FooterNavbar = props => (footerMenuItems.length > 0 ? (
  <StyledFooterMenuList {...props}>
    {footerMenuItems.map(footerMenuItem => (
      <FooterMenuListItem data={footerMenuItem} key={footerMenuItem.id} />
    ))}
  </StyledFooterMenuList>
) : null);

FooterMenuListItem.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default FooterNavbar;
