import React from 'react';
import styled from 'styled-components';

import { colors, fonts, transition } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import galleryImage from '../../../assets/images/temp/gallery-img.jpg';
import wineCardLikeBtn from '../../../assets/images/icons/heart-fill.svg';
import wineCardSmileBtn from '../../../assets/images/icons/smile.svg';
import wineCardAddBtn from '../../../assets/images/icons/plus-fill.svg';

const StyledWineCard = styled.div`
  position: relative;
  width: 100%;
  /* max-width: 280px; */
  ${breakpoints.smUp} {
    padding-left: 10px;
    padding-right: 10px;
  }
  ${breakpoints.smDown} {
    border-left: 30px solid ${colors.white};
  }
`;

const StyledWineCardBody = styled.div`
  padding: 20px;
  position: absolute;
  left: 0px;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${breakpoints.smUp} {
    width: calc(100% - 20px);
    left: 10px;
  }
`;

const StyledWineCardHead = styled.div`
  margin-bottom: 20px;
`;

const StyledWineCardFooter = styled.div`
  margin-top: auto;
  transition: ${transition.baseTransition};
  ${breakpoints.smDown} {
    padding-bottom: 70px;
  }
  ${StyledWineCard}:hover & {
    padding-bottom: 70px;
  }
`;

const StyledWineCardName = styled.p`
  font-size: 12px;
  font-family: ${fonts.fontConceptRegular};
  margin-bottom: 2px;
`;

const StyledWineCardTitle = styled.h4`
  font-size: 25px;
  font-family: ${fonts.fontInterstateBlackCompressed};
`;

const StyledWineCardLabel = styled.span`
  font-size: 12px;
  border-radius: 10px;
  background-color: ${colors.black};
  color: ${colors.white};
  display: inline-block;
  padding: 2px 24px;
`;

const StyledWineCardPanel = styled.div`
  border: 1px solid ${colors.black};
  border-top: none;
  width: 100%;
  padding: 20px 20px;
  background-color: ${colors.white};
  transition: ${transition.baseTransition};
  transform: translateY(100%);
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${breakpoints.smDown} {
    transform: translateY(0);
  }
  ${StyledWineCard}:hover & {
    transform: translateY(0%);
  }
`;

const StyledWineCardPanelLeft = styled.div`
  flex-shrink: 0;
  margin-right: 20px;
  display: inline-flex;
`;

const StyledWineCardPanelRight = styled.div`
  flex-shrink: 0;
  display: inline-flex;
`;

const StyledWineCardPanelBtn = styled.button`
  display: inline-block;
  border: none;
  background-color: transparent;
  padding: 0;
`;

const StyledWineCardPanelBtnLike = styled(StyledWineCardPanelBtn)`
  margin-right: 20px;
`;

const StyledWineCardIcon = styled.img`
  width: 20px;
`;

const StyledWineCardImg = styled.img`
  width: 100%;
`;

const StyledWineCardPrice = styled.span`
  font-size: 25px;
  display: inline-block;
  font-family: ${fonts.fontInterstateBlackCompressed};
`;

const StyledWineCardOldPrice = styled.del`
  font-size: 25px;
  display: inline-block;
  font-family: ${fonts.fontInterstateBlackCompressed};
  color: ${colors.danger};
  margin-right: 5px;
`;

const StyledWineCardBtnAdd = styled(StyledWineCardPanelBtn)`
  width: 30px;
  height: 30%;
  margin-left: 10px;
`;

const WineCard = () => (
  <StyledWineCard>
    <StyledWineCardImg src={galleryImage} alt="Slide item" />
    <StyledWineCardBody>
      <StyledWineCardHead>
        <StyledWineCardName>Chenin Blanc</StyledWineCardName>
        <StyledWineCardTitle>
            2 Brothers Chenin Blanc 2017
        </StyledWineCardTitle>
      </StyledWineCardHead>

      <StyledWineCardFooter>
        <StyledWineCardLabel>75% match</StyledWineCardLabel>
        <StyledWineCardPanel>
          <StyledWineCardPanelLeft>
            <StyledWineCardPanelBtnLike>
              <StyledWineCardIcon
                src={wineCardLikeBtn}
                alt="Like btn"
              />
            </StyledWineCardPanelBtnLike>

            <StyledWineCardPanelBtn>
              <StyledWineCardIcon
                src={wineCardSmileBtn}
                alt="Smile btn"
              />
            </StyledWineCardPanelBtn>
          </StyledWineCardPanelLeft>

          <StyledWineCardPanelRight>
            <StyledWineCardOldPrice>$25</StyledWineCardOldPrice>
            <StyledWineCardPrice>$23</StyledWineCardPrice>
            <StyledWineCardBtnAdd>
              <StyledWineCardImg
                src={wineCardAddBtn}
                alt={wineCardAddBtn}
              />
            </StyledWineCardBtnAdd>
          </StyledWineCardPanelRight>
        </StyledWineCardPanel>
      </StyledWineCardFooter>
    </StyledWineCardBody>
  </StyledWineCard>
);

export default WineCard;
