import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import { Container } from '../..';

const StyledHero = styled.div`
  background-color: ${colors.coral};
`;

const StyledHeroContainer = styled(Container)`
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  min-height: 420px;
  ${breakpoints.mdDown} {
    min-height: 320px;
    overflow-x: hidden;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 50px;
  text-transform: uppercase;
`;

export const HeroPicture = styled.img`
  max-width: 100%;
`;

export const Hero = props => {
  const { children } = props;
  return (
    <StyledHero>
      <StyledHeroContainer>{children}</StyledHeroContainer>
    </StyledHero>
  );
};

Hero.propTypes = {
  children: PropTypes.node.isRequired,
};
