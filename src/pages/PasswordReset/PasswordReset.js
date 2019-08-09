import React, { Component } from 'react';

import { Mutation } from 'react-apollo';

import { checkEmail } from '../../helpers/validations';
import InputField from '../../components/atoms/InputField/InputField';
import { RESET_PASSWORD } from '../../graphql/mutations';

import './PasswordReset.scss';

/**
 * Renders password reset page.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class PasswordReset extends Component {
  state = {
    form: {
      email: '',
    },
  };

  /**
   * Assigns new values to 'this.state.form' properties
   * @param value
   * @param field
   * */
  handleChange = (field, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, [field]: value } });
  };

  /**
   * Executes mutation
   * @param resetPassword
   * */
  handleSubmit = resetPassword => {
    const { state } = this;
    resetPassword({ variables: { email: state.form.email } });
  };

  render() {
    const { state } = this;
    const { email } = state.form;

    return (
      <Mutation mutation={RESET_PASSWORD}>
        {(resetPassword, { data, error }) => {
          if (error) {
            error.graphQLErrors.map(message => console.error('Non-friendly error message', message.message));
          }
          return (
            <div className="PasswordReset">
              <div className="PasswordReset--container">
                <h1 className="PasswordReset--forms__title">Reset Password</h1>
                <div className="PasswordReset--forms__form">
                  <h2>Password Reset Form</h2>
                  <InputField
                    label="Email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={this.handleChange}
                    validations={[checkEmail]}
                    serverValidation={data && [data.resetPassword.error]}
                  />
                  <button
                    type="button"
                    onClick={() => this.handleSubmit(resetPassword)}
                  >
                    Reset Password
                  </button>
                  {data && data.resetPassword.success && (
                    <div>
                      <p>Email with instructions has been sent.</p>
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

export default PasswordReset;
