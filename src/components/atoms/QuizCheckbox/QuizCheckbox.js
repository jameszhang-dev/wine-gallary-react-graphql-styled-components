import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

export const QuizStyledCheckbox = styled.label`
  cursor: pointer;
  padding: 130px 15px;
  border: 1px solid
    ${props => (props.isChecked ? colors.black : colors.white)};
  box-shadow: 0px 0px 0px 1px ${colors.silver} inset;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  background-color: ${props => (props.isChecked ? colors.white : 'transparent')};
  ${breakpoints.lgDown} {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  ${breakpoints.xsDown} {
    padding-top: 80px;
    padding-bottom: 30px;
  }
`;

const Checkbox = styled.input`
  position: absolute;
  display: none;
  opacity: 0;
  visibily: hidden;
`;

class QuizCheckbox extends Component {
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
      <QuizStyledCheckbox isChecked={isChecked}>
        <Checkbox
          type="checkbox"
          value={isChecked}
          onChange={this.handleChange}
        />
        {children}
      </QuizStyledCheckbox>
    );
  }
}

QuizCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QuizCheckbox;
