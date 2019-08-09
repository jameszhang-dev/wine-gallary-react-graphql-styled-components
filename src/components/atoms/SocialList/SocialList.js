import React from 'react';
import styled from 'styled-components';

import youtube from '../../../assets/images/icons/youtube.svg';
import facebook from '../../../assets/images/icons/facebook.svg';
import instagram from '../../../assets/images/icons/instagram.svg';

const socialListData = [
  {
    id: 'youtube',
    title: 'youtube',
    href: '/',
    imageSrc: youtube,
  },
  {
    id: 'facebook',
    title: 'facebook',
    href: '/',
    imageSrc: facebook,
  },
  {
    id: 'instagram',
    title: 'instagram',
    href: '/',
    imageSrc: instagram,
  },
];

const StyledSocialList = styled.ul`
  list-style: none;
`;
const StyledSocialListItem = styled.li`
  display: inline-block;
  &:not(:first-child) {
    margin-left: 10px;
  }
`;

const StyledSocialListLink = styled.a`
  display: inline-block;
`;

const StyledSocialListIcon = styled.img`
  display: block;
  width: 100%;
  max-width: 30px;
`;

const SocialList = () => (socialListData.length > 0 ? (
  <StyledSocialList>
    {socialListData.map(socialListItem => (
      <StyledSocialListItem key={socialListItem.id}>
        <StyledSocialListLink
          tagret="_blank"
          href={socialListItem.href}
        >
          <StyledSocialListIcon
            src={socialListItem.imageSrc}
            alt={socialListItem.title}
          />
        </StyledSocialListLink>
      </StyledSocialListItem>
    ))}
  </StyledSocialList>
) : null);

export default SocialList;
