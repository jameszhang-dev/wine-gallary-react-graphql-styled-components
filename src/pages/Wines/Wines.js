import React from 'react';

import styled from 'styled-components';

import {
  CartAlert,
  Container,
  FilterWines,
  Hero,
  HeroPicture,
  HeroTitle,
  Section,
  WineCard,
  WineCardSpecial,
  WineGallery,
} from '../../components';

import breakpoints from '../../styles/breakpoints';
import Layout from '../../styles/layout';
import { fonts } from '../../styles/variables';
import wineHeroPicture from '../../assets/images/temp/hero-wine-1.svg';

const StyledWineHeroPicture = styled(HeroPicture)`
  position: absolute;
  right: 280px;
  top: 0px;
  width: 270px;
  z-index: 5;
  ${breakpoints.mdDown} {
    right: 60px;
    top: 5px;
    width: 190px;
  }
  ${breakpoints.smDown} {
    right: 20px;
  }
  ${breakpoints.xsDown} {
    right: 0px;
    transform: translateX(35px);
    top: 30px;
    width: 160px;
  }
`;

const StyledWinesSection = styled(Section)`
  ${breakpoints.smDown} {
    padding-top: 20px;
  }
`;

const StyledTitle = styled.h2`
  font-family: ${fonts.fontInterstateBlackCompressed};
  font-size: 50px;
  ${breakpoints.smUp} {
    padding-right: 80px;
  }
  ${breakpoints.smDown} {
    font-size: 25px;
  }
`;

const StyledWineGalleryHolder = styled.div`
  margin-bottom: 70px;
  ${breakpoints.smDown} {
    font-size: 35px;
  }
`;

const Wines = () => (
  <Layout>
    <CartAlert />
    <Hero>
      <HeroTitle>Wines</HeroTitle>
      <StyledWineHeroPicture src={wineHeroPicture} />
    </Hero>

    <StyledWinesSection>
      <Container>
        <FilterWines />
        <StyledTitle>Teddy, here’s what you’ve saved</StyledTitle>
        <StyledWineGalleryHolder>
          <WineGallery>
            <WineCard />
            <WineCard />
          </WineGallery>
        </StyledWineGalleryHolder>

        <StyledTitle>Newest</StyledTitle>
        <StyledWineGalleryHolder>
          <WineGallery>
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
          </WineGallery>
        </StyledWineGalleryHolder>

        <StyledTitle>Special boxes</StyledTitle>
        <StyledWineGalleryHolder>
          <WineGallery>
            <WineCardSpecial special />
            <WineCardSpecial />
            <WineCardSpecial />
            <WineCardSpecial />
            <WineCardSpecial />
            <WineCardSpecial />
            <WineCardSpecial />
            <WineCardSpecial />
          </WineGallery>
        </StyledWineGalleryHolder>

        <StyledTitle>Acid chasers</StyledTitle>
        <StyledWineGalleryHolder>
          <WineGallery>
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
          </WineGallery>
        </StyledWineGalleryHolder>

        <StyledTitle>Tannin junkies</StyledTitle>
        <StyledWineGalleryHolder>
          <WineGallery>
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
          </WineGallery>
        </StyledWineGalleryHolder>

        <StyledTitle>Little Italian gems</StyledTitle>
        <StyledWineGalleryHolder>
          <WineGallery>
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
            <WineCard />
          </WineGallery>
        </StyledWineGalleryHolder>
      </Container>
    </StyledWinesSection>
  </Layout>
);

export default Wines;

