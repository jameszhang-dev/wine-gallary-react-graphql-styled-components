import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

import { checkPassword } from '../../helpers/validations';
import InputField from '../../components/atoms/InputField/InputField';
import { SET_NEW_PASSWORD } from '../../graphql/mutations';
import urlPatterns from '../../urls';

import './SetNewPassword.scss';

/**
 * Renders page for setting new password.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SetNewPassword extends Component {
  state = {
    form: {
      password: '',
      passwordConfirmation: '',
    },
    formError: '',
  };

  /**
   * Assigns new values to 'this.state.form' properties
   * @param value
   * @param field
   * */
  handleChange = (field, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, [field]: value }, formError: '' });
  };

  /**
   * Executes mutation and redirects the login page if mutation is successful
   * @param setNewPassword
   */
  handleSubmit = setNewPassword => {
    const { state, props } = this;
    const { password, passwordConfirmation } = state.form;

    if (password !== passwordConfirmation) {
      this.setState({ formError: 'Sorry, your passwords do not match.' });
      return;
    }

    const { token, uid } = props.match.params; // Values that identify user
    setNewPassword({ variables: { ...state.form, uidb64: uid, token } }).then(
      ({ data }) => {
        // Redirects to the login page on success
        data && data.setNewPassword.success && props.history.push(urlPatterns.LOGIN);
      }
    );
  };

  render() {
    const { state } = this;
    const { password, passwordConfirmation } = state.form;
    const { formError } = state;

    return (
      <Mutation mutation={SET_NEW_PASSWORD}>
        {(setNewPassword, { data, error }) => {
          if (error) {
            error.graphQLErrors.map(message => console.error('Non-friendly error message', message.message));
          }
          return (
            <div className="SetNewPassword">
              <div className="SetNewPassword--container">
                <h1 className="SetNewPassword--forms__title">Set New Password</h1>
                <div className="SetNewPassword--forms__form">
                  <h2>Set New Password Form</h2>
                  <InputField
                    label="Password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                    validations={[checkPassword]}
                  />
                  <InputField
                    label="Confirm the password"
                    placeholder="Confirm the password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    type="password"
                    value={passwordConfirmation}
                    onChange={this.handleChange}
                  />
                  {formError && <span>{ formError }</span>}
                  <button
                    type="button"
                    onClick={() => this.handleSubmit(setNewPassword)}
                  >
                    Set New Password
                  </button>
                  {data && data.setNewPassword.success && (
                    <div>
                      <p>New password has been set.</p>
                    </div>
                  )}
                  {data && data.setNewPassword.error && (
                    <div>
                      <p>{ data.setNewPassword.error }</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }
        }
      </Mutation>
    );
  }
}

export default SetNewPassword;
