import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withApollo, compose, graphql } from 'react-apollo';

import {
  CheckoutShippingAddressForm,
  DiscountCodeForm,
  OrderSummary,
} from '../../components';
import PaymentMethod from '../../components/organisms/PaymentMethod/PaymentMethod';
import { formatNumber } from '../../helpers/tools';
import urlPatterns from '../../urls';
import { GET_MEMBER } from '../../graphql/queries';
import { CHECKOUT } from '../../graphql/mutations';

import './Checkout.scss';

/**
 * Renders Checkout component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Checkout extends Component {
  static propTypes = {
    history: PropTypes.shape({}).isRequired,
    meQuery: PropTypes.shape({}).isRequired,
  };

  state = {
    shippingAddress: null,
    isProcessingCheckout: false,
    processingError: null,
  };

  /**
   * Updates information contained on shipping address form
   * @param {Object} shippingAddress
   * */
  handleShippingAddressUpdate = shippingAddress => {

    // TODO: [DEV-203] Improve this when link state introduced
    this.setState({
      shippingAddress,
    });
  };

  /**
   * Sends request for checkout mutation
   * @param {number} memberId
   * @param {Object} shoppingCart
   * @return {Promise<void>}
   * */
  handleSubmitPayment = async (memberId, shoppingCart) => {
    const { client, history } = this.props;
    const { shippingAddress } = this.state;

    // Provides visual feedback that the checkout is being processed
    this.setState({ isProcessingCheckout: true });

    // TODO DEV-203 To get token/error from apollo-link-state
    // Saves token from Stripe in browser's 'store'
    window.store.handleStripeAddNewCard && await window.store.handleStripeAddNewCard();
    const stripeResponse = window.store.stripeNewCreditCardToken;

    // Sets properties to send in GraphQL request, only changed properties will be sent to GraphQL
    const inputCheckout = { memberId };
    const inputShipping = { ...shippingAddress };
    const inputPaymentMethod = stripeResponse && stripeResponse.token
      ? { token: stripeResponse.token.id }
      : null;

    // Logs error in case stripe returns an error when creating token for credit card
    if (stripeResponse && stripeResponse.error) console.error('From checkout stripe: ', stripeResponse.error);

    // Requests checkout mutation with only updated information
    client.mutate({
      mutation: CHECKOUT,
      refetchQueries: () => [{ query: GET_MEMBER }],
      variables: {
        input: {
          shippingAddress: {
            ...inputShipping,
          },
          ...inputCheckout,
          ...inputPaymentMethod,
        },
      },
    }).then(response => {

      // Hides processing visual feedback
      this.setState({ isProcessingCheckout: false });

      if (response.data.checkout.isSuccessful) {

        // Removes token from window variable
        if (window.store.stripeNewCreditCardToken) delete window.store.stripeNewCreditCardToken;

        const checkoutDetails = {
          // Used by other services (e.g. Facebook pixel)
          currency: 'AUD',
          value: formatNumber(shoppingCart.total),
          revenue: formatNumber(shoppingCart.total),
          content_category: 'checkout',
          order_category_id: shoppingCart.id,
        };
        history.push(urlPatterns.THANK_YOU, { checkout: checkoutDetails });
      }

      // Renders errors from GraphQL in case any
      if (response.data.checkout.errors) {
        this.setState({
          processingError: response.data.checkout.errors[0] && response.data.checkout.errors[0].field,
        });
      }
    });
  };

  render() {
    const { shippingAddress, isProcessingCheckout, processingError } = this.state;
    const { history, meQuery } = this.props;

    // Disables and enables button to submit based on required fields
    const isShippingAddressFormCompleted = Boolean(
      shippingAddress && shippingAddress.line1 && shippingAddress.city && shippingAddress.state
      && shippingAddress.postcode && shippingAddress.addressUnavailableInstructionId
    );

    if (meQuery.loading) { return <div>Loading...</div>; }

    if (!meQuery.me.hasUpdatedPassword) {
      history.push(
        urlPatterns.SIGN_UP, { quiz: true, email: meQuery.me.email, memberId: meQuery.me.id }
      );
    }

    return (
      <div className="Checkout">

        {/* Provides a visual feedback while order is being processed */}
        {
          isProcessingCheckout && (
            <div className="loading">
              Our wine elf is processing your order...
            </div>)
        }
        <div className="Checkout--container">
          <h1 className="Checkout--forms__title">Checkout</h1>

          {/* Renders error from GraphQL if any */}
          <h4>{processingError && processingError}</h4>
          <div className="Checkout--forms__shipping">
            <CheckoutShippingAddressForm
              me={meQuery.me}
              handleShippingAddressChange={this.handleShippingAddressUpdate}
              isCheckoutPage
            />
          </div>
          <div className="Checkout--forms__summary">
            <OrderSummary me={meQuery.me} />
          </div>
          <div className="Checkout--forms__payment">
            { // Shows Payment form only when necessary
              meQuery.me.shoppingCart.total > 0 && <PaymentMethod me={meQuery.me} isCheckoutPage />
            }
          </div>
          <div className="Checkout--forms__discount-code">
            <DiscountCodeForm query={meQuery.me} />
          </div>
          <div className="Checkout--forms__confirmation">
            <button
              type="button"
              className="payment-confirmation"
              onClick={() => this.handleSubmitPayment(meQuery.me.id, meQuery.me.shoppingCart)}
              disabled={!isShippingAddressFormCompleted}
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withApollo,
  graphql(GET_MEMBER, { name: 'meQuery' }),
)(Checkout);
