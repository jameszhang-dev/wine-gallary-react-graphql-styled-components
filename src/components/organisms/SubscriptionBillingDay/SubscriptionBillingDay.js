import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';
import { UPDATE_SUBSCRIPTION } from '../../../graphql/resolvers/subscription';

import './SubscriptionBillingDay.scss';

/**
 * Renders SubscriptionBillingDay component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SubscriptionBillingDay extends Component {
  static propTypes = {
    me: PropTypes.shape({}).isRequired,
    updateSubscription: PropTypes.func.isRequired,
  };

  state = {
    errors: [],
  };

  /**
   * Sends request to the API to update the billing day.
   *
   * @param event
   */
  handleDaySelection = event => {
    const { me, updateSubscription } = this.props;
    const billingDay = parseInt(event.target.value, 10);
    const subscriptionId = me.subscription.id;

    updateSubscription({
      variables: {
        input: {
          id: subscriptionId,
          memberId: me.id,
          billingDay,
        },
      },
    }).then(({ data }) => {
      if (data.updateSubscription.errors && data.updateSubscription.errors.length) {
        this.setState({ errors: data.updateSubscription.errors });
      } else {
        this.setState({ errors: [] });
      }
    });
  };

  render() {
    const { me } = this.props;
    const { errors } = this.state;

    const memberHasSubscription = me.subscription !== null;
    const currentBillingDay = me.subscription && me.subscription.billingDay;
    const daysAvailable = Array.from({ length: 30 }, (v, k) => k + 1); // Days from 1 to 30

    return (
      <div className="SubscriptionSummary">
        <h2>Billing Day</h2>
        {
          memberHasSubscription
            ? (
              <div>
                <select value={currentBillingDay} onChange={event => this.handleDaySelection(event)}>
                  {daysAvailable.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <div>{errors.map(error => <p key={error}>{error.messages}</p>)}</div>
              </div>
            )
            : <p>You are not subscribed</p>
        }
      </div>
    );
  }
}

export default compose(
  graphql(UPDATE_SUBSCRIPTION, { name: 'updateSubscription' }),
)(SubscriptionBillingDay);
