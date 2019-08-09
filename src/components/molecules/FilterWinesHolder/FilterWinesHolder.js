import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

import {
  colors,
  filterWines,
  transition,
  fonts,
} from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

import {
  FilterWinesHeader,
  FilterWinesFooter,
  RangeSlider,
  CheckboxFilter,
} from '../..';

const StyledFilterWinesHolder = styled.div`
  background-color: ${colors.white};
  padding: 40px;
  overflow-y: auto;
  position: fixed;
  left: 0;
  z-index: 650;
  transition: ${transition.baseTransition};
  ${breakpoints.smUp} {
    top: ${filterWines.topMargin};
    height: calc(100vh - ${filterWines.topMargin});
    box-shadow: 0 5px 10px 0 ${rgba(colors.black, 0.1)};
    width: ${filterWines.filterWidth};
    transform: translateX(
      ${props => (!props.filterWinesIsOpen ? '-420px' : '0px')}
    );
  }
  ${breakpoints.smDown} {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;
    top: 0;
    width: 100%;
    padding: 15px 20px;
    transform: translateX(
      ${props => (!props.filterWinesIsOpen ? '-100%' : '0px')}
    );
  }
`;

const FilterWinesBodyHolder = styled.div`
  ${breakpoints.smDown} {
    flex: 1;
    margin-bottom: 20px;
  }
`;

const FilterWinesTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: ${fonts.fontInterstateUltraBlack};
  font-size: 25px;
  margin-bottom: 30px;
  ${breakpoints.smDown} {
    display: none;
  }
`;

const StyledFilterWinesSubTitle = styled.h5`
  margin-bottom: 10px;
  font-family: ${fonts.fontInterstateBlackCompressed};
  font-size: 50px;
  ${breakpoints.smDown} {
    font-size: 25px;
  }
`;

const StyledFilterWinesCheckboxFilters = styled.div`
  &:not(:last-child) {
    margin-bottom: 35px;
  }
`;

const FilterWinesHolder = props => {
  const { filterWinesIsOpen, toggleFilterWines } = props;

  return (
    <StyledFilterWinesHolder filterWinesIsOpen={filterWinesIsOpen}>
      <FilterWinesHeader toggleFilterWines={toggleFilterWines} />

      <FilterWinesBodyHolder>
        <FilterWinesTitle>Filter</FilterWinesTitle>

        <StyledFilterWinesSubTitle>Price</StyledFilterWinesSubTitle>
        <RangeSlider />

        <StyledFilterWinesSubTitle>Colour</StyledFilterWinesSubTitle>
        <StyledFilterWinesCheckboxFilters>
          <CheckboxFilter>red</CheckboxFilter>
          <CheckboxFilter>White</CheckboxFilter>
          <CheckboxFilter>Rosé</CheckboxFilter>
          <CheckboxFilter>Sparkling</CheckboxFilter>
          <CheckboxFilter>Special</CheckboxFilter>
        </StyledFilterWinesCheckboxFilters>

        <StyledFilterWinesSubTitle>Other</StyledFilterWinesSubTitle>
        <StyledFilterWinesCheckboxFilters>
          <CheckboxFilter>Vegan</CheckboxFilter>
          <CheckboxFilter>Natural</CheckboxFilter>
          <CheckboxFilter>Low preservative</CheckboxFilter>
        </StyledFilterWinesCheckboxFilters>
      </FilterWinesBodyHolder>

      <FilterWinesFooter />
    </StyledFilterWinesHolder>
  );
};

FilterWinesHolder.propTypes = {
  filterWinesIsOpen: PropTypes.bool,
  toggleFilterWines: PropTypes.bool,
};

FilterWinesHolder.defaultProps = {
  filterWinesIsOpen: false,
  toggleFilterWines: false,
};

export default FilterWinesHolder;
