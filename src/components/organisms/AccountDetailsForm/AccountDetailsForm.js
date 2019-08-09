import React from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';

import { GET_MEMBER } from '../../../graphql/queries';
import { UPDATE_MEMBER_ACCOUNT_DETAILS } from '../../../graphql/mutations';
import {
  checkEmail,
  checkName,
  checkPassword,
  checkServerValidation,
} from '../../../helpers/validations';
import InputField from '../../atoms/InputField/InputField';

import './AccountDetailsForm.scss';

/**
 * Renders AccountDetailsForm in a stateless component
 * Stateless Components (Function Components):
 * https://reactjs.org/docs/components-and-props.html#function-and-class-components
 * @param props
 * @return {React.Component}
 * */
const AccountDetailsForm = props => {
  const { me } = props;

  // Initiates variables that will hold the value to pass into the mutation
  let email;
  let gender;
  let lastName;
  let firstName;
  let birthDate;
  let mobileNumber;
  let newPassword;
  let confirmPassword;
  let passwordNotMatchError;

  /**
   * Handles data submitted to update Account Details from member
   * @param event
   * @param updateShippingAddress
   * */
  const handleSubmitForm = (event, updateShippingAddress) => {
    event.preventDefault();

    // Checks if passwords are matching
    const isPasswordMatch = newPassword.value === confirmPassword.value;

    // Creates an "input" object with all the properties
    const input = {
      id: me.id,
      firstName: firstName.value,
      lastName: lastName.value,
      birthDate: birthDate.value,
      gender: gender.value || null,
      mobileNumber: mobileNumber.value,
      email: email.value,
      password: newPassword.value,
    };

    // Creates a copy of the "input" constant (inputNoPassword) without the password
    const { password, ...inputNoPassword } = input;

    // Checks if password has a value meaning that the user wants to update password
    if (isPasswordMatch && newPassword.value) {
      updateShippingAddress({
        variables:
          {
            input: {
              ...input,
            },
          },
      });
    } else if (!newPassword.value) {
      updateShippingAddress({
        variables:
          {
            input: {
              ...inputNoPassword,
            },
          },
      });
    } else if (!isPasswordMatch) {

      // TODO: DEV-109 consider to change to a state variable so we can remove alert
      passwordNotMatchError = 'Sorry your passwords didn\'t match, try again!';
      alert(passwordNotMatchError);
    }
  };

  return (
    <Mutation mutation={UPDATE_MEMBER_ACCOUNT_DETAILS} refetchQueries={() => [{ query: GET_MEMBER }]}>
      {(updateShippingAddress, { data, error }) => {
        if (error) {
          error.graphQLErrors.map(message => console.log('Non-friendly error message', message.message));
        }
        return (
          <div className="AccountDetailsForm">
            <div className="AccountDetailsForm--form">
              <h2>My Account Details</h2>
              <form onSubmit={e => handleSubmitForm(e, updateShippingAddress)}>
                <InputField
                  type="text"
                  label="First Name"
                  name="accountDetailsFirstName"
                  id="accountDetailsFirstName"
                  validations={[checkName]}
                  value={me.firstName}
                  reference={node => {
                    firstName = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Last Name"
                  name="accountDetailsLastName"
                  id="accountDetailsLastName"
                  value={me.lastName}
                  validations={[checkName]}
                  reference={node => {
                    lastName = node;
                  }}
                />
                <InputField
                  type="date"
                  label="Birth date"
                  name="birthDate"
                  id="birthDate"
                  value={me.birthDate}
                  serverValidation={data && checkServerValidation(data, 'updateMember', 'birth_date')}
                  reference={node => {
                    birthDate = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Gender"
                  name="gender"
                  id="gender"
                  value={me.gender}
                  reference={node => {
                    gender = node;
                  }}
                />
                <InputField
                  type="number"
                  label="Mobile number"
                  name="mobileNumber"
                  id="mobileNumber"
                  value={me.mobileNumber}
                  serverValidation={data && checkServerValidation(data, 'updateMember', 'mobile_number')}
                  reference={node => {
                    mobileNumber = node;
                  }}
                />
                <InputField
                  type="text"
                  label="Email"
                  name="email"
                  id="email"
                  value={me.email}
                  serverValidation={data && checkServerValidation(data, 'updateMember', 'email')}
                  validations={[checkEmail]}
                  reference={node => {
                    email = node;
                  }}
                />
                <InputField
                  type="password"
                  label="New password"
                  name="newPassword"
                  id="newPassword"
                  value={me.password}
                  validations={[checkPassword]}
                  reference={node => {
                    newPassword = node;
                  }}
                />
                <InputField
                  type="password"
                  label="Confirm password"
                  name="confirmPassword"
                  id="confirmPassword"
                  validations={[checkPassword]}
                  reference={node => {
                    confirmPassword = node;
                  }}
                />
                <button type="submit">Update Account Details</button>
              </form>
            </div>
          </div>);
      }}
    </Mutation>
  );
};

// Declares type for props coming from parent component
AccountDetailsForm.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobileNumber: PropTypes.string,
    gender: PropTypes.string,
    birthDate: PropTypes.string,
  }),
};

AccountDetailsForm.defaultProps = {
  me: [{}],
};

export default AccountDetailsForm;
