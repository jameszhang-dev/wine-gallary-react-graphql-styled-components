import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import { isLoggedIn } from '../../../helpers/auth';
import {
  APPLY_DISCOUNT_FROM_FREE_BOX_CAMPAIGN,
  SET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT,
} from '../../../graphql/mutations';
import {
  GET_MEMBER,
  GET_REFERRAL_DISCOUNT,
  GET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT, GET_SHOPPING_CART,
} from '../../../graphql/queries';
import {
  DISCOUNT_TYPE_IDS,
  DISCOUNT_TYPE_VALUES,
  FETCH_POLICY_CACHE_ONLY,
} from '../../../helpers/constants';

import './HeaderDiscountMessage.scss';

/**
 * Renders HeaderDiscountMessage.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class HeaderDiscountMessage extends Component {
  static propTypes = {
    meQuery: PropTypes.shape({
      me: PropTypes.shape({
        shoppingCart: PropTypes.shape({
          discountType: PropTypes.shape({
            id: PropTypes.number,
          }),
        }),
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
    applyDiscountFromFreeBoxCampaign: PropTypes.func.isRequired,
    setGuestFreeBoxCampaignDiscount: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const { meQuery, referralDiscountQuery, guestFreeBoxCampaignDiscountQuery } = this.props;

    const currentDiscountTypeId = meQuery.me && meQuery.me.shoppingCart
      && meQuery.me.shoppingCart.discountType && meQuery.me.shoppingCart.discountType.id;
    const nextDiscountTypeId = nextProps.meQuery.me && nextProps.meQuery.me.shoppingCart
      && nextProps.meQuery.me.shoppingCart.discountType && nextProps.meQuery.me.shoppingCart.discountType.id;

    const currentReferralCode = referralDiscountQuery.referralDiscount.referralCode;
    const nextReferralCode = nextProps.referralDiscountQuery.referralDiscount.referralCode;

    const currentGiveawayCode = referralDiscountQuery.referralDiscount.giveawayCode;
    const nextGiveawayCode = nextProps.referralDiscountQuery.referralDiscount.giveawayCode;

    const currentFreeBoxCampaignId = (
      guestFreeBoxCampaignDiscountQuery.guestFreeBoxCampaignDiscount.freeBoxCampaignId
    );
    const nextFreeBoxCampaignId = (
      nextProps.guestFreeBoxCampaignDiscountQuery.guestFreeBoxCampaignDiscount.freeBoxCampaignId
    );

    // Updates component if discountTypeId has been changed or if any of the discount info from
    // apollo-link-state have been changed
    return !(
      currentDiscountTypeId === nextDiscountTypeId
      && currentReferralCode === nextReferralCode
      && currentGiveawayCode === nextGiveawayCode
      && currentFreeBoxCampaignId === nextFreeBoxCampaignId
    );
  }

  async componentDidUpdate() {

    const {
      meQuery,
      applyDiscountFromFreeBoxCampaign,
      guestFreeBoxCampaignDiscountQuery,
      setGuestFreeBoxCampaignDiscount,
    } = this.props;

    // Checks if we need to apply a freeBoxCampaign discount
    const { freeBoxCampaignId } = guestFreeBoxCampaignDiscountQuery.guestFreeBoxCampaignDiscount;
    if (meQuery.me && freeBoxCampaignId) {
      await applyDiscountFromFreeBoxCampaign({
        variables: {
          input: {
            freeBoxCampaignId,
            memberId: meQuery.me.id,
          },
        },
      });
      await setGuestFreeBoxCampaignDiscount({ variables: { freeBoxCampaignId: null } });
    }
  }

  /**
   * Gets discount message if referral, giveaway or free-box-campaign codes are applied.
   *
   * @return {string|null}
   */
  getDiscountMessage = () => {
    const {
      meQuery,
      referralDiscountQuery,
      guestFreeBoxCampaignDiscountQuery,
    } = this.props;

    let hasReferralDiscount = false;
    let hasGiveawayDiscount = false;
    let hasFreeBoxCampaignDiscount = false;

    if (isLoggedIn()) {

      // For logged users gets discount from the shopping cart
      const discountType = meQuery.me && meQuery.me.shoppingCart && meQuery.me.shoppingCart.discountType;
      hasReferralDiscount = (
        discountType && discountType.id === DISCOUNT_TYPE_IDS.DB_ID_DISCOUNT_TYPE_REFERRAL
      );
      hasGiveawayDiscount = (
        discountType && discountType.id === DISCOUNT_TYPE_IDS.DB_ID_DISCOUNT_TYPE_GIVEAWAY
      );
      hasFreeBoxCampaignDiscount = (
        discountType && discountType.id === DISCOUNT_TYPE_IDS.DB_ID_DISCOUNT_TYPE_FREE_BOX
      );
    } else {

      // For users not logged in gets discount info from apollo-link-state
      const { referralCode, giveawayCode } = referralDiscountQuery.referralDiscount;
      const { freeBoxCampaignId } = guestFreeBoxCampaignDiscountQuery.guestFreeBoxCampaignDiscount;
      hasGiveawayDiscount = Boolean(referralCode) && Boolean(giveawayCode);
      hasReferralDiscount = Boolean(referralCode);
      hasFreeBoxCampaignDiscount = Boolean(freeBoxCampaignId);
    }

    let discountValue = 0;
    if (hasGiveawayDiscount) {
      discountValue = DISCOUNT_TYPE_VALUES.DB_ID_DISCOUNT_TYPE_GIVEAWAY;
    } else if (hasReferralDiscount) {
      discountValue = DISCOUNT_TYPE_VALUES.DB_ID_DISCOUNT_TYPE_REFERRAL;
    } else if (hasFreeBoxCampaignDiscount) {
      discountValue = DISCOUNT_TYPE_VALUES.DB_ID_DISCOUNT_TYPE_FREE_BOX;
    }

    if (discountValue) return `You have $${discountValue} discount`;
    return null;
  };

  render() {
    const discountMessage = this.getDiscountMessage();

    return (
      <div className="HeaderDiscountMessage">
        {discountMessage && <p>{discountMessage}</p>}
      </div>
    );
  }
}

export default compose(
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
  graphql(GET_MEMBER, { name: 'meQuery' }),
  graphql(SET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT, { name: 'setGuestFreeBoxCampaignDiscount' }),
  graphql(APPLY_DISCOUNT_FROM_FREE_BOX_CAMPAIGN, {
    name: 'applyDiscountFromFreeBoxCampaign',
    options: { refetchQueries: () => [{ query: GET_MEMBER }, { query: GET_SHOPPING_CART }] },
  }),
)(HeaderDiscountMessage);
