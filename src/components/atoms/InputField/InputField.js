import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './InputField.scss';

/**
 * Renders Input field component for a form with label and validation.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class InputField extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onKeyPress: PropTypes.func,
    hint: PropTypes.string,
    reference: PropTypes.func,
    validations: PropTypes.arrayOf(PropTypes.func),
    serverValidation: PropTypes.arrayOf(PropTypes.string),
    minWidth: PropTypes.number,
  };

  static defaultProps = {
    hint: '',
    type: 'text',
    value: null,
    onChange: null,
    reference: null,
    onKeyPress: null,
    validations: [],
    serverValidation: [],
    placeholder: '',
    minWidth: null,
  };

  state = { errorText: [], inputValue: '' };

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      inputValue: value || '',
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    // Updates state with props only if the value in props has been changed
    if (nextProps.value !== null && nextProps.value !== prevState.inputValue) {
      return { inputValue: nextProps.value };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    // Updates errorText with error that returns from server
    if (prevProps.serverValidation !== props.serverValidation) {
      this.handleUpdateMessageError(props.serverValidation);
    }
  }

  handleUpdateMessageError = serverValidation => {
    this.setState({
      errorText: serverValidation,
    });
  };

  /**
   * Assigns value from the input field to the state and passes value and field name up to parent component
   * @param event
   * */
  handleChange = event => {
    const { onChange, name } = this.props;
    const { value } = event.target;
    this.setState({ inputValue: value });
    onChange && onChange(name, value);
  };

  /**
   * Controls error in the input based on validation rules received from component declaration
   * @param event
   * */
  handleValidation = event => {
    const { validations } = this.props;
    const { value } = event.target;
    for (let index = 0; index < validations.length; index++) {
      const validation = validations[index];
      this.setState({ errorText: validation(value) });
    }
  };

  /**
   * Assigns value to input object
   * @param node
   * */
  handleRef = node => {
    const { reference } = this.props;
    reference && reference(node);
  };

  render() {
    const { errorText, inputValue } = this.state;
    const {
      label,
      type,
      hint,
      onKeyPress,
      placeholder,
      name,
      id,
      serverValidation,
      minWidth,
    } = this.props;

    return (
      <div className="InputField">
        <label id={`${id}Label`} htmlFor="birthDate">
          <span>{label}</span>
          <input
            id={id}
            name={name}
            type={type}
            value={type === 'email' ? inputValue && inputValue.toLowerCase() : inputValue || ''}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            onChange={this.handleChange}
            onBlur={this.handleValidation}
            ref={node => this.handleRef(node)}
            style={{ minWidth }}
          />
        </label>
        <div className="hint">{hint}</div>
        {errorText && <div className="error">{errorText}</div>}

        {/*
          TODO [DEV-167] understand componentDidUpdate returning prevProps === props for serverValidation
        */}
        {
          !!serverValidation.length && errorText && !errorText.length && (
            <div className="error">{serverValidation[0]}</div>
          )
        }
      </div>
    );
  }
}

export default InputField;
