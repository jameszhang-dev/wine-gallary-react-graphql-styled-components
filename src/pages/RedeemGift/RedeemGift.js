import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { InputField } from '../../components';
import { REDEEM_GIFT } from '../../graphql/mutations';
import urlPatterns from '../../urls';

import './RedeemGift.scss';

/**
 * Renders page for redeeming Gifts.
 * */
class RedeemGift extends Component {
  static propTypes = {
    history: PropTypes.shape({}).isRequired,
  };

  state = {
    redeemCode: null,
    isValid: null,
    member: {},
    errors: [],
  };

  /**
   * Handles submitting the redeem code.
   */
  handleSubmit = () => {
    const { state, props } = this;
    const { redeemGift } = props;

    redeemGift({
      variables: {
        input: {
          redeemCode: state.redeemCode,
        },
      },
    }).then(({ data }) => {

      if (data.redeemGift.errors) {
        this.setState({
          isValid: false,
          errors: data.redeemGift.errors,
        });
      } else {
        this.setState({
          isValid: data.redeemGift.isValid,
          member: data.redeemGift.member,
          errors: [],
        });
      }
    });

  };

  /**
   * Navigates to the next page which depends on a Member (if they already have an account or not).
   */
  navigateToNextPage = () => {
    const { member } = this.state;
    const { history } = this.props;

    if (member.hasUpdatedPassword) {
      history.push(
        urlPatterns.LOGIN, { redirectUrl: `${process.env.REACT_APP_BASE_URL}${urlPatterns.QUIZ}` },
      );
    } else {
      history.push(urlPatterns.SIGN_UP, { isGiftRedeem: true, memberId: member.id });
    }
  };

  render() {
    const { state } = this;
    const { member } = state;

    return (
      <div className="RedeemGift">
        {
          state.isValid
            ? (
              <div>
                {`Welcome ${member.firstName}`}
                <button type="button" onClick={this.navigateToNextPage}>next</button>
              </div>
            )
            : (
              <div>
                <h3>CONGRATS!</h3>
                <h5>Type your gift code below and get started on your wine adventure :)</h5>
                <InputField
                  id="redeemGift"
                  name="redeemGift"
                  onChange={(field, value) => this.setState({ redeemCode: value })}
                  label="Your gift code"
                />
                <button
                  type="button"
                  onClick={this.handleSubmit}
                >
                  redeem
                </button>
                {state.isValid === false && <div>Code not valid</div>}
                {state.errors.length > 0 && state.errors.map(err => <div key={err}>{err.messages[0]}</div>)}
              </div>
            )
        }
      </div>
    );
  }
}

export default compose(
  graphql(REDEEM_GIFT, { name: 'redeemGift' }),
)(RedeemGift);
