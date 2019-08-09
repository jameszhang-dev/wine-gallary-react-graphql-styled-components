import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';

import './ButtonMutation.scss';

/**
 * Renders ButtonMutation component.
 * Generic component for a button with mutation.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class ButtonMutation extends Component {
  static propTypes = {
    input: PropTypes.shape({}).isRequired,
    label: PropTypes.string.isRequired,
    mutationProp: PropTypes.shape({}).isRequired,
    reFetchQueriesProp: PropTypes.arrayOf(PropTypes.shape({})),
    disabled: PropTypes.bool,
    mutationPayloadName: PropTypes.string,
    handleShowErrors: PropTypes.func,
    onClick: PropTypes.func,
    handleResponse: PropTypes.func,

  };

  static defaultProps = {
    reFetchQueriesProp: [],
    disabled: false,
    mutationPayloadName: null,
    handleShowErrors: null,
    onClick: null,
    handleResponse: null,
  };

  /**
   * Triggers mutation passing "input" from props.
   * @param {Function} mutationMethod: mutation client
   * @param {Object} event: click button event
   * */
  handleButtonClicked = (event, mutationMethod) => {
    const {
      input,
      mutationPayloadName,
      handleShowErrors,
      onClick,
      handleResponse,
    } = this.props;
    mutationMethod({ variables: { input } }).then(data => {

      // Shows friendly errors from GraphQL's response
      if (handleShowErrors && mutationPayloadName && data.data[mutationPayloadName]
        && data.data[mutationPayloadName].errors && data.data[mutationPayloadName].errors.length) {
        handleShowErrors(data.data[mutationPayloadName].errors[0].messages[0]);
      }

      // Sends response back to parent component independent of success or failure
      handleResponse && handleResponse(data);
    });

    // Triggers event when for when user clicks the button good to simulates button clicked
    !!onClick && onClick(event);
  };

  render() {
    const {
      reFetchQueriesProp,
      mutationProp,
      label,
      disabled,
    } = this.props;

    return (
      <div className="ButtonMutation">
        <Mutation
          mutation={mutationProp}
          refetchQueries={() => reFetchQueriesProp}
        >
          {(mutationMethod, { loading, error }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <button
                type="button"
                onClick={
                  event => this.handleButtonClicked(event, mutationMethod)
                }
                disabled={disabled}
              >
                {label}
              </button>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default ButtonMutation;
