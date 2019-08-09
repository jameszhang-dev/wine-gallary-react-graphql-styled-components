import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  Mutation,
  withApollo,
  compose,
  graphql,
} from 'react-apollo';

import {
  ADD_SHOPPING_CART_ITEM,
  SIGN_UP,
  UPDATE_MEMBER_ACCOUNT_DETAILS,
  SET_REFERRAL_DISCOUNT,
  SET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT,
} from '../../graphql/mutations';
import {
  GET_REFERRAL_DISCOUNT,
  GET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT,
} from '../../graphql/queries';
import { FETCH_POLICY_CACHE_ONLY } from '../../helpers/constants';
import urlPatterns from '../../urls';
import { executeLogInRequest } from '../../helpers/auth';
import {
  checkEmail,
  checkName,
  checkPassword,
  checkServerValidation,
} from '../../helpers/validations';
import { shoppingCartLocalStorage } from '../../helpers/tools';
import InputField from '../../components/atoms/InputField/InputField';

import './SignUp.scss';

/**
 * Renders sign up page
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SignUp extends Component {
  static propTypes = {
    client: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        email: PropTypes.string,
        quiz: PropTypes.bool,
        isShoppingCart: PropTypes.bool,
        isGiftRedeem: PropTypes.bool,
      }),
    }).isRequired,
    referralDiscountQuery: PropTypes.shape({
      referralDiscount: PropTypes.shape({
        referralCode: PropTypes.string,
        giveawayCode: PropTypes.string,
      }),
    }).isRequired,
    guestFreeBoxCampaignDiscountQuery: PropTypes.shape({
      guestFreeBoxCampaignDiscount: PropTypes.shape({
        freeBoxCampaignId: PropTypes.number,
      }),
    }).isRequired,
  };

  state = {
    errors: [],
    form: {
      firstName: '',
      lastName: '',
      email: (
        this.props.location.state // eslint-disable-line react/destructuring-assignment
        && this.props.location.state.email // eslint-disable-line react/destructuring-assignment
      ) || '',
      password: '',
      birthDate: '',
      confirmPassword: '',
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
   * Sends sign up request to GraphQL mutation and log results in the browser
   * On successful sign up it saves local storage shopping cart item to database
   * @param signUp
   * @param addShoppingCart
   * @return {Promise<void>}
   * */
  handleSubmit = async (signUp, addShoppingCart) => {
    const { state, props } = this;
    const { setReferralDiscount, setGuestFreeBoxCampaignDiscount } = props;
    const id = props.location.state && props.location.state.memberId;
    const shoppingCart = shoppingCartLocalStorage();

    // Properties used to verify if user will be redirected to checkout page
    const isQuiz = props.location.state && props.location.state.quiz;
    const isShoppingCart = props.location.state && props.location.state.isShoppingCart;
    const isGiftRedeem = props.location.state && props.location.state.isGiftRedeem;

    // Creates an array (signUpInput) removing unnecessary info
    const { confirmPassword, ...signUpInput } = state.form;

    // Builds input depending on which page the user is accessing
    let input = null;
    if (!isQuiz && !isShoppingCart && !isGiftRedeem) {
      input = { ...signUpInput };
    } else {
      input = { ...signUpInput, id, hasUpdatedPassword: true };
    }

    if (confirmPassword === signUpInput.password) {

      // Adds referral, giveaway and free-box-campaign info to the input
      const { referralCode, giveawayCode } = props.referralDiscountQuery.referralDiscount;
      const { freeBoxCampaignId } = props.guestFreeBoxCampaignDiscountQuery.guestFreeBoxCampaignDiscount;
      input = {
        ...input, referralCode, giveawayCode, freeBoxCampaignId,
      };

      // Saves new member (signUp)
      await signUp({ variables: { input } })
        .then(async member => {

          // Removes discounts from the apollo-link-state as it's been saved in the database
          // by the signUp mutation
          await setReferralDiscount({
            variables: {
              referralCode: null,
              giveawayCode: null,
            },
          });
          await setGuestFreeBoxCampaignDiscount({
            variables: {
              freeBoxCampaignId: null,
            },
          });

          // Checks if user has added items to local storage shopping cart
          if (shoppingCart) {

            // Creates shopping cart in database with local storage item
            shoppingCart.items.length
            && shoppingCart.items.map(item => addShoppingCart({
              variables:
                {
                  input:
                    {
                      memberId: member.data.signUp.id,
                      productId: item.product.id,
                      quantity: item.quantity,
                    },
                },
            }).then(

              //  Deletes shopping cart from local storage
              window.localStorage.removeItem('shoppingCart')
            ));
          }
          if (isQuiz) {
            window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.CHECKOUT}`;

            // Only executes login in case SignUp mutation returns no error
          } else if (!member.data.signUp.errors) {

            // Executes Login and redirects user to MyAccount page
            executeLogInRequest(state.form.email, state.form.password)
              .then(() => {

                // In case the user is coming from shopping cart
                if (isShoppingCart) {
                  window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.CHECKOUT}`;
                } else if (isGiftRedeem) {
                  window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.QUIZ}`;
                } else {

                  // Redirects to my account page
                  window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.MY_ACCOUNT}`;
                }
              })

              // Catches error from server (if login unsuccessful) and show message in the form
              .catch(error => {

                // Stores error from server's response in state variables
                this.setState({
                  form: {
                    ...state.form,
                    error: [error.response.data.error_description],
                  },
                });
              });
          }
        });
    } else {
      this.setState({ errors: ['Sorry, your passwords do not match.'] });
    }
  }
  ;

  render() {
    const { state, props } = this;
    const isQuiz = props.location.state && props.location.state.quiz;
    const { errors } = state;
    const {
      firstName,
      lastName,
      email,
      password,
      birthDate,
      confirmPassword,
    } = state.form;

    return (
      <Mutation mutation={ADD_SHOPPING_CART_ITEM}>
        {(addShoppingCart, { loading: loadingAddShoppingCart, error: errorAddShoppingCart }) => {
          if (loadingAddShoppingCart) return 'Loading...';
          if (errorAddShoppingCart) console.log('Non-friendly error message', errorAddShoppingCart.message);

          return (
            <Mutation mutation={isQuiz ? UPDATE_MEMBER_ACCOUNT_DETAILS : SIGN_UP}>
              {(signUp, { data, error, loading }) => {
                if (loading) return 'Loading...';
                if (error) console.log('Non-friendly error message', error.message);
                if (data && data.signUp && !data.signUp.errors) return 'Logging you in :)';
                return (
                  <div className="SignUp">
                    <div className="SignUp--container">
                      <h1 className="SignUp--forms__title">SignUp</h1>
                      <div className="SignUp--forms__form">
                        <InputField
                          label="First Name"
                          placeholder="First Name"
                          name="firstName"
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={this.handleChange}
                          validations={[checkName]}
                          serverValidation={data && checkServerValidation(data, 'signUp', 'first_name')}
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
                          serverValidation={data && checkServerValidation(data, 'signUp', 'last_name')}
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
                          serverValidation={data && checkServerValidation(data, 'signUp', 'email')}
                        />
                        <InputField
                          label="Date of birth"
                          name="birthDate"
                          id="birthDate"
                          type="date"
                          value={birthDate}
                          onChange={this.handleChange}
                          serverValidation={data && checkServerValidation(data, 'signUp', 'birth_date')}
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
                        {errors && <span>{errors[0]}</span>}
                        <button onClick={() => this.handleSubmit(signUp, addShoppingCart)} type="button">
                          submit
                        </button>
                      </div>
                      <div className="SignUp--forms_social">
                        <h2>GraphQL Server Response</h2>

                        {/* Prints in the screen error message from server */}
                        {/* TODO: DEV-107 Add validation  */}
                        {data && data.signUp && data.signUp.errors && (
                          <div>
                            {data.signUp.errors.map(inputError => (
                              <p key={inputError.field}>
                                {`${inputError.field}: ${inputError.messages[0]}`}
                              </p>
                            ))}
                          </div>
                        )}
                        {errors && <div>{errors}</div>}

                        {/* Prints in the screen response from server in case it succeeds */}
                        {!isQuiz && data && data.signUp.id && (
                          <div>
                            <div>
                              <p>Success direct from graphql:</p>
                              <span>{`id: ${data.signUp.id}`}</span>
                              <br />
                              <span>{`name: ${data.signUp.firstName}`}</span>
                            </div>
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
        }}
      </Mutation>
    );
  }
}

export default compose(
  withApollo,
  graphql(
    GET_REFERRAL_DISCOUNT, {
      name: 'referralDiscountQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY },
    }
  ),
  graphql(
    GET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT, {
      name: 'guestFreeBoxCampaignDiscountQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY },
    }
  ),
  graphql(SET_REFERRAL_DISCOUNT, { name: 'setReferralDiscount' }),
  graphql(SET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT, { name: 'setGuestFreeBoxCampaignDiscount' }),
)(SignUp);
