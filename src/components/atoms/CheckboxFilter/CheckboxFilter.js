import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors, fonts } from '../../../styles/variables';

const StyledCheckboxFilterItem = styled.label`
  position: relative;
  display: inline-block;
  outline: none;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  border: 1px solid ${colors.black};
  text-transform: uppercase;
  font-size: 10px;
  font-family: ${fonts.fontBauMedium};
  cursor: pointer;
  padding: 7px 27px;
  background-color: ${props => (!props.isChecked ? 'transparent' : colors.black)};
  color: ${props => (!props.isChecked ? colors.black : colors.white)};
`;

const StyledCheckboxFilterInput = styled.input`
  position: absolute;
  display: none;
  opacity: 0;
  visibily: hidden;
`;

class CheckboxFilter extends Component {
  state = {
    isChecked: false,
  };

  handleChange = () => {
    this.setState(prevState => ({ isChecked: !prevState.isChecked }));
  };

  render() {
    const { isChecked } = this.state;
    const { children } = this.props;

    return (
      <StyledCheckboxFilterItem isChecked={isChecked}>
        <StyledCheckboxFilterInput
          type="checkbox"
          value={isChecked}
          onChange={this.handleChange}
        />
        {children}
      </StyledCheckboxFilterItem>
    );
  }
}

CheckboxFilter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CheckboxFilter;
