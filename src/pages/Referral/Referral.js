import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';
import queryString from 'query-string';

import {
  SET_REFERRAL_DISCOUNT,
  VALIDATE_REFERRAL_CODE,
  VALIDATE_GIVEAWAY_CODE,
} from '../../graphql/resolvers/member';
import { FETCH_POLICY_NO_CACHE } from '../../helpers/constants';
import urlPatterns from '../../urls';

import './Referral.scss';

/**
 * Renders Referral page.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Referral extends Component {
  static propTypes = {
    setReferralDiscount: PropTypes.func.isRequired,
    validateGiveawayCode: PropTypes.func.isRequired,
    validateReferralCode: PropTypes.func.isRequired,
    match: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({}).isRequired,
  };

  static contextTypes = {};

  componentDidMount() {
    const {
      setReferralDiscount,
      validateGiveawayCode,
      validateReferralCode,
      match,
      location,
      history,
    } = this.props;

    // Gets referralCode and giveawayCode from URL
    const { referralCode } = match.params;
    const queryParams = queryString.parse(location.search);
    const giveawayCode = queryParams.giveaway_code;

    // Validates referralCode and giveawayCode and saves them to the apollo-link-state
    if (referralCode && giveawayCode) {
      validateGiveawayCode({
        variables: {
          input: {
            referralCode,
            giveawayCode,
          },
        },
      }).then(({ data }) => {
        if (data.validateGiveawayCode.isValid) {
          setReferralDiscount({
            variables: {
              referralCode,
              giveawayCode,
            },
          }).then(() => {
            history.push(urlPatterns.HOME);
          });
        } else {

          // Navigates to home if code is not valid
          history.push(urlPatterns.HOME);
        }
      });
    } else if (referralCode) {
      validateReferralCode({
        variables: {
          input: {
            referralCode,
          },
        },
      }).then(({ data }) => {
        if (data.validateReferralCode.isValid) {
          setReferralDiscount({
            variables: {
              referralCode,
            },
          }).then(() => {
            history.push(urlPatterns.HOME);
          });
        } else {

          // Navigates to home if code is not valid
          history.push(urlPatterns.HOME);
        }
      });
    }
  }

  render() {
    return (
      <div className="Referral">
        <p>Validating referral code...</p>
      </div>
    );
  }
}

export default compose(
  graphql(VALIDATE_REFERRAL_CODE, { name: 'validateReferralCode' }),
  graphql(VALIDATE_GIVEAWAY_CODE, { name: 'validateGiveawayCode' }),
  graphql(
    SET_REFERRAL_DISCOUNT, {
      name: 'setReferralDiscount',
      options: { fetchPolicy: FETCH_POLICY_NO_CACHE },
    }
  ),
)(Referral);
