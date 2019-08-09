import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import filterIconBack from '../../../assets/images/icons/back.svg';

const StyledFilterWinesHeader = styled.div`
  ${breakpoints.smUp} {
    display: none;
  }
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 35px;
`;

const FilterTitle = styled.h3`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: ${fonts.fontInterstateUltraBlack};
  font-size: 20px;
  flex: 1;
  margin-bottom: 0;
`;

const StyledFilterWinesHeaderTotal = styled.span`
  flex-shrink: 0;
  margin-left: 20px;
  font-size: 20px;
  font-family: ${fonts.fontInterstateBlackCompressed};
`;

const StyledFilterWinesHeaderBack = styled.button`
  flex-shrink: 0;
  margin-right: 20px;
  border: none;
  background-color: transparent;
  padding: 0;
`;

const StyledFilterWinesHeaderBackIcon = styled.img`
  width: 16px;
`;

const FilterWinesHeader = props => {
  const { toggleFilterWines } = props;

  return (
    <StyledFilterWinesHeader>
      <StyledFilterWinesHeaderBack onClick={toggleFilterWines}>
        <StyledFilterWinesHeaderBackIcon src={filterIconBack} />
      </StyledFilterWinesHeaderBack>
      <FilterTitle>Filter wines</FilterTitle>
      <StyledFilterWinesHeaderTotal>50</StyledFilterWinesHeaderTotal>
    </StyledFilterWinesHeader>
  );
};

FilterWinesHeader.propTypes = {
  toggleFilterWines: PropTypes.bool,
};

FilterWinesHeader.defaultProps = {
  toggleFilterWines: false,
};

export default FilterWinesHeader;
