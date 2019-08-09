import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

import './CheckBox.scss';

/**
 * Renders CheckBox component.
 * This component accepts both only local state update, or can also send GraphQL requests
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class CheckBox extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string.isRequired,
    checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
    query: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
    mutation: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
    mutationVariables: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func]),
  };

  static defaultProps = {
    name: '',
    label: '',
    onChange: null,
    query: null,
    mutation: null,
    mutationVariables: null,
  };

  /**
   * Updates UI state and in case of mutation it also sends request to GraphQL server
   * @param id
   * @param mutationCallBack
   * */
  handleChange = (id, mutationCallBack) => {
    const {
      onChange,
      mutation,
      mutationVariables,
      checked,
    } = this.props;

    // Sends message to parent component that the checkbox UI was updated
    onChange(id, !checked);

    // Sends request to GraphQL server in case this component is connected to graphql
    if (mutation) {
      mutationCallBack({ variables: { ...mutationVariables } });
    }
  };

  /**
   * Renders checkbox element without mutation and can be connected to a
   * mutation component, if mutation is available from props
   * @param mutation
   * @return {Component}
   * */
  renderCheckBox = (mutation = null) => {
    const {
      id,
      name,
      label,
      checked,
    } = this.props;
    return (
      <div className="CheckBox">
        <label htmlFor={id} className="CheckBox--label">
          <span>{label}</span>
          <input
            type="checkbox"
            name={name || id}
            id={id}
            onChange={() => this.handleChange(id, mutation)}
            checked={checked}
          />
        </label>
      </div>
    );
  };

  render() {
    const {
      query,
      mutation,
    } = this.props;

    // Renders component with mutation in case needs a mutation
    if (mutation) {
      return (
        <Mutation mutation={mutation} refetchQueries={() => [{ query }]}>
          {(updateCheckbox, { error }) => {
            if (error) {
              console.log('Non-friendly error message', error);
            }
            return this.renderCheckBox(updateCheckbox);
          }}
        </Mutation>
      );
    }

    // Renders component without mutation in case the mutation is done on a parent component
    return this.renderCheckBox();
  }
}

export default CheckBox;
