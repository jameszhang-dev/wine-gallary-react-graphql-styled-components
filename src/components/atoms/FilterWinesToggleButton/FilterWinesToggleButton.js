import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

import { colors, filterWines, fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';
import filterIconOpen from '../../../assets/images/icons/filter.svg';
import filterIconClose from '../../../assets/images/icons/cancel.svg';

const StyledFilterToggleButtonDesktop = styled.button`
  ${breakpoints.smUp} {
    background-color: ${colors.white};
    box-shadow: 8px 5px 10px 0 ${rgba(colors.black, 0.1)};
    width: calc(${filterWines.toggleButtonSize});
    height: ${filterWines.toggleButtonSize};
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: none;
    position: fixed;
    top: ${filterWines.topMargin};
    left: 0;
    z-index: 700;
    transform: translateX(
      ${props => (!props.filterWinesIsOpen ? '0px' : filterWines.filterWidth)}
    );
  }
  ${breakpoints.smDown} {
    font-family: ${fonts.fontBauMedium};
    color: ${colors.black};
    padding: 7.5px 5px;
    border: 1px solid ${colors.black};
    background-color: transparent;
    display: block;
    width: 100%;
    margin-bottom: 35px;
    text-transform: uppercase;
    text-align: center;
    position: relative;
    font-size: 12px;
  }
`;

const StyledFilterToggleButtonDesktopTitle = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${fonts.fontBauMedium};
  display: inline-block;
  margin-bottom: 5px;
  ${breakpoints.smDown} {
    display: none;
  }
`;

const StyledFilterToggleButtonMobileTitle = styled(
  StyledFilterToggleButtonDesktopTitle
)`
  ${breakpoints.smUp} {
    display: none;
  }
  margin-bottom: 0;
  ${breakpoints.smDown} {
    display: block;
  }
`;

const StyledFilterToggleButtonDesktopIcon = styled.img`
  width: 20px;
  ${breakpoints.smDown} {
    display: none;
  }
`;

const StyledFilterToggleButtonMobileIcon = styled.img`
  ${breakpoints.smUp} {
    display: none;
  }
  width: 14px;
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
`;

const FilterWinesToggleButton = props => {
  const { toggleFilterWines, filterWinesIsOpen } = props;

  return (
    <StyledFilterToggleButtonDesktop
      onClick={toggleFilterWines}
      filterWinesIsOpen={filterWinesIsOpen}
    >
      {!filterWinesIsOpen && (
        <StyledFilterToggleButtonDesktopTitle>
          Filter
        </StyledFilterToggleButtonDesktopTitle>
      )}

      <StyledFilterToggleButtonDesktopIcon
        src={!filterWinesIsOpen ? filterIconOpen : filterIconClose}
      />

      <StyledFilterToggleButtonMobileTitle>
        Filter
      </StyledFilterToggleButtonMobileTitle>
      <StyledFilterToggleButtonMobileIcon src={filterIconOpen} />
    </StyledFilterToggleButtonDesktop>
  );
};

FilterWinesToggleButton.propTypes = {
  toggleFilterWines: PropTypes.bool,
  filterWinesIsOpen: PropTypes.bool,
};

FilterWinesToggleButton.defaultProps = {
  toggleFilterWines: false,
  filterWinesIsOpen: false,
};

export default FilterWinesToggleButton;
