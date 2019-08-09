import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { compose, graphql } from 'react-apollo';

import {
  ADD_FREE_BOX_CAMPAIGN_INTEREST,
  APPLY_DISCOUNT_FROM_FREE_BOX_CAMPAIGN,
  SET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT,
} from '../../../graphql/mutations';
import { isLoggedIn } from '../../../helpers/auth';
import { GET_AUTH } from '../../../graphql/resolvers/auth';
import urlPatterns from '../../../urls';

import './FreeBoxCampaignAction.scss';

/**
 * Renders the action button to sign-up or register interest in a FreeBoxCampaign.
 * */
class FreeBoxCampaignAction extends Component {

  static propTypes = {
    sellingMessage: PropTypes.string.isRequired,
    freeBoxCampaign: PropTypes.shape({}).isRequired,
    addFreeBoxCampaignInterest: PropTypes.func.isRequired,
    applyDiscountFromFreeBoxCampaign: PropTypes.func.isRequired,
    setGuestFreeBoxCampaignDiscount: PropTypes.func.isRequired,
    authQuery: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({}).isRequired,
  };

  /**
   * Sends request to GraphQL to register interest from the user in the free box campaign.
   * If user is not logged in, it will be redirected to the login page.
   * */
  handleAddFreeBoxCampaignInterest = () => {
    const {
      history, authQuery, freeBoxCampaign, addFreeBoxCampaignInterest,
    } = this.props;

    if (isLoggedIn()) {
      const memberId = authQuery.auth && authQuery.auth.memberId;
      addFreeBoxCampaignInterest({
        variables: {
          input: {
            freeBoxCampaignId: freeBoxCampaign.id,
            memberId,
          },
        },
      }).then(() => {
        alert('Thanks, we have registered your interest!'); // TODO (DEV-396) move to status component
      });
    } else {
      history.push(urlPatterns.LOGIN);
    }
  };

  /**
   * Sends request to GraphQL to apply discount from the free box campaign.
   * If user is not logged in, saves the freeBoxCampaign info on apollo state.
   * */
  handleApplyDiscountFromFreeBoxCampaign = () => {
    const {
      history,
      authQuery,
      freeBoxCampaign,
      applyDiscountFromFreeBoxCampaign,
      setGuestFreeBoxCampaignDiscount,
    } = this.props;

    if (isLoggedIn()) {

      const memberId = authQuery.auth && authQuery.auth.memberId;
      applyDiscountFromFreeBoxCampaign({
        variables: {
          input: {
            freeBoxCampaignId: freeBoxCampaign.id,
            memberId,
          },
        },
      }).then(({ data }) => {
        if (data.applyDiscountFromFreeBoxCampaign.isSuccessful) {
          history.push(urlPatterns.QUIZ);
        } else {
          alert('Sorry, this promotion is not longer active!'); // TODO (DEV-396) move to status component
        }
      });

    } else {

      setGuestFreeBoxCampaignDiscount({
        variables: {
          freeBoxCampaignId: freeBoxCampaign.id,
        },
      }).then(() => {
        history.push(urlPatterns.QUIZ);
      });

    }
  };

  render() {

    const { freeBoxCampaign, sellingMessage, authQuery } = this.props;

    if (authQuery.loading) return 'Loading...';

    return (
      <div className="FreeBoxCampaignAction--container">
        {
          freeBoxCampaign.isAvailable
            ? (
              <div>
                <p>{sellingMessage}</p>
                <button type="button" onClick={() => this.handleApplyDiscountFromFreeBoxCampaign()}>
                  {freeBoxCampaign.buyButtonText}
                </button>
              </div>
            )
            : (
              <div>
                <p>{freeBoxCampaign.heroMonthlyLimitReachedText}</p>
                <button type="button" onClick={() => this.handleAddFreeBoxCampaignInterest()}>
                  Register your interest
                </button>
              </div>
            )
        }
      </div>
    );
  }
}

export default compose(
  graphql(ADD_FREE_BOX_CAMPAIGN_INTEREST, { name: 'addFreeBoxCampaignInterest' }),
  graphql(APPLY_DISCOUNT_FROM_FREE_BOX_CAMPAIGN, { name: 'applyDiscountFromFreeBoxCampaign' }),
  graphql(SET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT, { name: 'setGuestFreeBoxCampaignDiscount' }),
  graphql(GET_AUTH, { name: 'authQuery' }),
)(FreeBoxCampaignAction);
