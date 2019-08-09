import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { InputField } from '../..';
import { ADD_SHOPPING_CART_ITEM } from '../../../graphql/resolvers/cart';
import { SIGN_UP } from '../../../graphql/resolvers/member';
import {
  GET_GIFT_FLOW_SIGN_UP_FORM_INFO,
  SET_GIFT_FLOW_SIGN_UP_FORM_INFO,
} from '../../../graphql/resolvers/gift';
import {
  checkEmail,
  checkName,
  checkPassword,
  checkServerValidation,
} from '../../../helpers/validations';

import './GiftSignUpForm.scss';

/**
 * Renders GiftSignUpForm component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class GiftSignUpForm extends Component {
  static propTypes = {
    giftFlowSignUpFormInfoQuery: PropTypes.shape({}).isRequired,
    setGiftFlowSignUpFormInfo: PropTypes.func.isRequired,
  };

  state = {
    validation: {},
  };

  /**
   * Sends new values to mutation 'giftFlowSignUpForm'
   * @param {string|boolean|number} value
   * @param {string} property
   * */
  handleChange = async (property, value) => {
    const { setGiftFlowSignUpFormInfo, giftFlowSignUpFormInfoQuery } = this.props;
    await setGiftFlowSignUpFormInfo({
      variables: {
        ...giftFlowSignUpFormInfoQuery.giftFlowSignUpForm,
        [property]: value,
      },
    });
  };

  render() {
    const { state, props } = this;
    const { giftFlowSignUpFormInfoQuery } = props;
    const { validation } = state;

    if (giftFlowSignUpFormInfoQuery.loading || !giftFlowSignUpFormInfoQuery.giftFlowSignUpForm) {
      return <div>Loading...</div>;
    }

    const {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      confirmPassword,
    } = giftFlowSignUpFormInfoQuery.giftFlowSignUpForm;

    return (
      <div className="GiftSignUpForm">
        <div className="GiftSignUpForm--container">
          <h1 className="GiftSignUpForm--forms__title">Your Information</h1>
          <div className="GiftSignUpForm--forms__form">
            <InputField
              label="First Name"
              placeholder="First Name"
              name="firstName"
              id="firstName"
              type="text"
              value={firstName}
              onChange={this.handleChange}
              validations={[checkName]}
              serverValidation={
                validation && checkServerValidation(validation, 'signUp', 'first_name')
              }
            />
            <InputField
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              type="text"
              value={lastName}
              onChange={this.handleChange}
              validations={[checkName]}
              serverValidation={
                validation && checkServerValidation(validation, 'signUp', 'last_name')
              }
            />
            <InputField
              label="Email"
              placeholder="Email"
              name="email"
              id="email"
              type="email"
              value={email}
              onChange={this.handleChange}
              validations={[checkEmail]}
              serverValidation={
                validation && checkServerValidation(validation, 'signUp', 'email')
              }
            />
            <InputField
              label="Date of birth"
              name="birthDate"
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={this.handleChange}
              serverValidation={
                validation && checkServerValidation(validation, 'signUp', 'birth_date')
              }
            />
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
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(ADD_SHOPPING_CART_ITEM, { name: 'addShoppingCart' }),
  graphql(SIGN_UP, { name: 'signUp' }),
  graphql(SET_GIFT_FLOW_SIGN_UP_FORM_INFO, { name: 'setGiftFlowSignUpFormInfo' }),
  graphql(GET_GIFT_FLOW_SIGN_UP_FORM_INFO, { name: 'giftFlowSignUpFormInfoQuery' }),
)(GiftSignUpForm);
