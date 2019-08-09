import React from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';

import { fonts, colors } from '../../../styles/variables';

import 'rc-slider/assets/index.css';

const StyledSliderWrapper = styled.div`
  .rc-slider-step {
    background-color: black;
  }
  .rc-slider-mark-text {
    font-family: ${fonts.fontInterstateUltraBlack};
    color: ${colors.black};
  }
  .rc-slider-handle,
  .rc-slider-dot {
    border-radius: 0;
    border-color: ${colors.coral};
    &:hover,
    &:focus {
      border-color: ${colors.coral};
      box-shadow: none;
    }
    &.rc-slider-dot-active {
      border-color: ${colors.coral};
      background-color: ${colors.coral};
      &:hover {
        border-color: ${colors.coral};
      }
    }
  }
`;

const StyledSlider = styled(Slider)`
  margin-bottom: 50px;
`;

const marks = {
  15: '$15',
  23: '$23',
  38: '$38',
};

const RangeSlider = () => (
  <StyledSliderWrapper>
    <StyledSlider
      min={15}
      max={38}
      defaultValue={23}
      marks={marks}
      step={null}
    />
  </StyledSliderWrapper>
);

export default RangeSlider;
