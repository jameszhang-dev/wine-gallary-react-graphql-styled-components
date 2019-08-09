import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import { InputField } from '../..';
import { APPLY_DISCOUNT_CODE } from '../../../graphql/mutations';
import { GET_MEMBER } from '../../../graphql/queries';
import urlPatterns from '../../../urls';

import './DiscountCodeForm.scss';

/**
 * Renders DiscountCodeForm component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class DiscountCodeForm extends Component {
  static propTypes = {
    query: PropTypes.shape({
      id: PropTypes.number,
      shoppingCart: PropTypes.shape({
        discount: PropTypes.number,
        discountCode: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    query: {},
  };

  state = {
    promoCode: null,
    message: null,
  };

  /**
   * Assigns new values to 'this.state.form' properties
   * @param field
   * @param value
   * */
  handleChange = (field, value) => {
    const { state } = this;
    this.setState({ ...state, [field]: value });
  };

  /**
   * Sends request to mutation to update or shopping cart with discount code
   * @param applyDiscountCode
   * */
  handleSubmit = applyDiscountCode => {
    const { state, props } = this;

    applyDiscountCode({
      variables: {
        input: {
          memberId: props.query.id,
          name: state.promoCode,
        },
      },
    })
      .then(response => {

        // Updates component state in case discount code is invalid or it is a wrong product type
        this.setState({
          promoCode:
            response.data.addPromoCodeInfo.message ? null : response.data.addPromoCodeInfo.name,
          errorMessage: response.data.addPromoCodeInfo.message,
        });
      });
  };

  render() {
    const { promoCode, errorMessage } = this.state;
    const { query } = this.props;

    // Returns a message in case user doesn't have a shopping cart.
    if (!query.shoppingCart) {
      return (
        <div>
          Sorry, it seems like your shopping cart is empty.
          <br />
          If you want to browse our fantastic list of wines, go ahead and click
          <Link to={urlPatterns.WINES}> here.</Link>
        </div>
      );
    }
    const { discountCode, discount } = query.shoppingCart;

    return (
      <div className="DiscountCodeForm">
        <h2>Discount code</h2>
        <Mutation
          mutation={APPLY_DISCOUNT_CODE}
          refetchQueries={() => [{ query: GET_MEMBER }]}
        >
          {(applyDiscountCode, { loading, error }) => {
            if (error) {
              error.graphQLErrors.map(message => console.log('Non-friendly error message', message.message));
            }
            if (loading) return (<div>Loading</div>);
            return (
              <div className="DiscountCodeForm--form">
                {
                  discountCode
                    ? (
                      <div className="DiscountCodeForm--code">
                        {`You have got a total of AU$${discount} in discount.`}
                      </div>
                    )
                    : (
                      <div>
                        <InputField
                          id="promoCode"
                          name="promoCode"
                          value={promoCode}
                          onChange={this.handleChange}
                          label="If you have a promo or a referral code, please enter it here:"
                          placeholder="CODE1234"
                        />
                        <button
                          type="button"
                          onClick={() => this.handleSubmit(applyDiscountCode)}
                          disabled={!promoCode}
                        >
                          Apply Discount
                        </button>
                        <div>{errorMessage && <span>{errorMessage}</span>}</div>
                      </div>
                    )
                }
              </div>);
          }}
        </Mutation>
      </div>
    );
  }
}

export default DiscountCodeForm;
