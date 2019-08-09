import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, fonts, transition } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import galleryImage from '../../../assets/images/temp/gallery-img-2.jpg';
import wineCardAddBtn from '../../../assets/images/icons/plus-fill.svg';

const StyledWineCardSpecial = styled.div`
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledWineCardSpecialBody = styled.div`
  padding: 20px;
  position: absolute;
  left: 10px;
  top: 0;
  width: calc(100% - 20px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledWineCardSpecialHead = styled.div`
  margin-bottom: 20px;
`;

const StyledWineCardSpecialFooter = styled.div`
  transition: ${transition.baseTransition};
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const StyledWineCardSpecialTitle = styled.h4`
  font-size: ${props => (props.special ? '50px' : '70px')};
  font-family: ${props => (props.special
    ? fonts.fontInterstateUltraBlack
    : fonts.fontInterstateBlackCompressed)};
  display: flex;
  flex-direction: column;
  line-height: 0.85;
  text-align: right;
  ${breakpoints.mdUp} {
    margin-top: 20px;
  }
  ${breakpoints.lgDown} {
    font-size: 50px;
  }
  ${breakpoints.smDown} {
    font-size: 30px;
  }
`;

const StyledWineCardSpecialTitleSpan = styled.span`
  display: inline-block;
`;

const StyledWineCardSpecialPanel = styled.div`
  border: 1px solid ${colors.black};
  border-top: none;
  width: 100%;
  padding: 20px 20px;
  background-color: ${colors.white};
  transition: ${transition.baseTransition};
  transform: translateY(100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${breakpoints.smDown} {
    transform: translateY(0%);
  }
  ${StyledWineCardSpecial}:hover & {
    transform: translateY(0%);
  }
`;

const StyledWineCardSpecialPanelLeft = styled.div`
  flex-shrink: 0;
  margin-right: 20px;
  display: inline-flex;
`;

const StyledWineCardSpecialPanelRight = styled.div`
  flex-shrink: 0;
  display: inline-flex;
`;

const StyledWineCardSpecialPanelBtn = styled.button`
  display: inline-block;
  border: none;
  background-color: transparent;
  padding: 0;
`;

const StyledWineCardSpecialImg = styled.img`
  width: 100%;
`;

const StyledWineCardSpecialPrice = styled.span`
  font-size: 25px;
  display: inline-block;
  font-family: ${fonts.fontInterstateBlackCompressed};
`;

const StyledWineCardSpecialBtnAdd = styled(
  StyledWineCardSpecialPanelBtn
)`
  width: 30px;
  height: 30%;
  margin-left: 10px;
`;

const StyledWineCardSpecialAddToCart = styled.span`
  font-size: 10px;
  text-transform: uppercase;
`;

const WineCardSpecial = props => {
  const { special } = props;

  return (
    <StyledWineCardSpecial>
      <StyledWineCardSpecialImg src={galleryImage} alt="Slide item" />
      <StyledWineCardSpecialBody>
        <StyledWineCardSpecialHead>
          <StyledWineCardSpecialTitle special={special}>
            <StyledWineCardSpecialTitleSpan>
              Rosé
            </StyledWineCardSpecialTitleSpan>
            <StyledWineCardSpecialTitleSpan>
              Summer
            </StyledWineCardSpecialTitleSpan>
          </StyledWineCardSpecialTitle>
        </StyledWineCardSpecialHead>

        <StyledWineCardSpecialFooter>
          <StyledWineCardSpecialPanel>
            <StyledWineCardSpecialPanelLeft>
              <StyledWineCardSpecialAddToCart>
                Add to cart
              </StyledWineCardSpecialAddToCart>
            </StyledWineCardSpecialPanelLeft>

            <StyledWineCardSpecialPanelRight>
              <StyledWineCardSpecialPrice>
                $23
              </StyledWineCardSpecialPrice>
              <StyledWineCardSpecialBtnAdd>
                <StyledWineCardSpecialImg
                  src={wineCardAddBtn}
                  alt={wineCardAddBtn}
                />
              </StyledWineCardSpecialBtnAdd>
            </StyledWineCardSpecialPanelRight>
          </StyledWineCardSpecialPanel>
        </StyledWineCardSpecialFooter>
      </StyledWineCardSpecialBody>
    </StyledWineCardSpecial>
  );
};

WineCardSpecial.propTypes = {
  special: PropTypes.bool,
};

WineCardSpecial.defaultProps = {
  special: false,
};

export default WineCardSpecial;
