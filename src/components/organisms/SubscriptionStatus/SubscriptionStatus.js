import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import Dropdown from 'react-dropdown';

import { UPDATE_SUBSCRIPTION } from '../../../graphql/mutations';
import { GET_MEMBER } from '../../../graphql/queries';
import { SUBSCRIPTION_STATUS, MONTH_NAMES, SUBSCRIPTION_STATUS_ID_TO_NAME } from '../../../helpers/constants';

import './SubscriptionStatus.scss';

const statusObj = {
  active: {
    subscriptionStatus: SUBSCRIPTION_STATUS.ACTIVE,
  },
  skip: {
    subscriptionStatus: SUBSCRIPTION_STATUS.SKIP,
  },
  pause2Months: {
    subscriptionStatus: SUBSCRIPTION_STATUS.PAUSE,
    pauseMonths: 2,
  },
  pause3Months: {
    subscriptionStatus: SUBSCRIPTION_STATUS.PAUSE,
    pauseMonths: 3,
  },
  cancelled: {
    subscriptionStatus: SUBSCRIPTION_STATUS.CANCELLED,
  },
  frequency1Month: {
    subscriptionStatus: SUBSCRIPTION_STATUS.ACTIVE,
    monthFrequency: 1,
  },
  frequency2Months: {
    subscriptionStatus: SUBSCRIPTION_STATUS.ACTIVE,
    monthFrequency: 2,
  },
  frequency3Months: {
    subscriptionStatus: SUBSCRIPTION_STATUS.ACTIVE,
    monthFrequency: 3,
  },
};

const defaultState = {
  showModal: false,
  isCancel: false,
  showFrequencyOptions: false,
  showOnlyFrequencyOptions: false,
  frequencyOption: null,
};

/**
 * Renders SubscriptionStatus component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SubscriptionStatus extends Component {
  static propTypes = {
    me: PropTypes.shape({ subscription: PropTypes.shape({ }) }).isRequired,
  };

  state = defaultState;

  /**
   * Updates subscription status and hides extra options (if opened)
   * @param updateSubscription
   * @param inputObj
   * */
  handleChangeStatus = (updateSubscription, inputObj) => {
    const { showModal } = this.state;
    const { me } = this.props;
    updateSubscription({
      variables: {
        input: {
          id: me.subscription.id,
          memberId: me.id,
          ...inputObj,
        },
      },
    });
    if (showModal) {
      this.setState(defaultState);
    }
  };

  /**
   * Renders drop down menu to select delivery frequency option.
   * @param updateSubscription
   * @return {Component}
   * */
  renderFrequencyOptions = updateSubscription => {
    const { frequencyOption } = this.state;
    return (
      <div>
        <Dropdown
          options={[
            { value: 'frequency1Month', label: 'Send me a new box every month' },
            { value: 'frequency2Months', label: 'Send me a new box every 2 months' },
            { value: 'frequency3Months', label: 'Send me a new box every 3 months' },
          ]}
          value={frequencyOption}
          onChange={option => this.setState({ frequencyOption: option.value })}
        />
        <button
          type="button"
          disabled={!frequencyOption}
          onClick={() => this.handleChangeStatus(updateSubscription, statusObj[frequencyOption])}
        >
          Update
        </button>
      </div>
    );
  };

  /**
   * Renders extra options for changing subscription status
   * @param updateSubscription
   * @return {Component}
   * */
  renderModal = updateSubscription => {
    const { isCancel, showOnlyFrequencyOptions, showFrequencyOptions } = this.state;
    return (
      <div className="SubscriptionStatus--modal">
        <h3>My Subscription</h3>
        <span
          className="close-btn"
          role="button"
          tabIndex="0"
          onKeyPress={() => this.setState(defaultState)}
          onClick={() => this.setState(defaultState)}
        >
          X
        </span>
        {
          showOnlyFrequencyOptions
            ? (
              <div>
                {this.renderFrequencyOptions(updateSubscription)}
              </div>)
            : (
              <div>
                <button
                  type="button"
                  onClick={() => this.handleChangeStatus(updateSubscription, statusObj.skip)}
                >
                  Skip 1 month
                </button>
                <button
                  type="button"
                  onClick={() => this.handleChangeStatus(updateSubscription, statusObj.pause2Months)}
                >
                  Pause 2 months
                </button>
                <button
                  type="button"
                  onClick={() => this.handleChangeStatus(updateSubscription, statusObj.pause3Months)}
                >
                  Pause 3 months
                </button>
                <button
                  type="button"
                  onClick={() => this.setState({ showFrequencyOptions: true })}
                >
                  Too Much Wines ?
                </button>
                {
                  isCancel && (
                    <button
                      type="button"
                      onClick={() => this.handleChangeStatus(updateSubscription, statusObj.cancelled)}
                    >
                      Cancel
                    </button>)
                }
                {
                  showFrequencyOptions && (this.renderFrequencyOptions(updateSubscription))
                }
              </div>
            )
        }
      </div>
    );
  };

  /**
   * Renders Call to Action buttons under the status indicator
   * @param statusUpperCase
   * @param updateSubscription
   * @return {Component}
   * */
  renderCallToActions = (statusUpperCase, updateSubscription) => {
    const { me } = this.props;
    const monthFrequency = me.subscription && me.subscription.monthFrequency;
    if (statusUpperCase) {
      return (
        <div className="SubscriptionStatus--cta">
          {
            monthFrequency > 1
              ? (
                <div>
                  <button
                    type="button"
                    onClick={() => this.setState({
                      showModal: true,
                      isCancel: false,
                      showOnlyFrequencyOptions: true,
                      showFrequencyOptions: true,
                    })}
                  >
                    Change Subscription
                  </button>
                </div>)
              : (
                <div>
                  {
                    (statusUpperCase === SUBSCRIPTION_STATUS.ACTIVE)
                    && (
                      <button
                        type="button"
                        onClick={() => this.handleChangeStatus(updateSubscription, statusObj.skip)}
                      >
                        Skip 1 month
                      </button>
                    )
                  }
                  {
                    (statusUpperCase === SUBSCRIPTION_STATUS.ACTIVE
                      || statusUpperCase === SUBSCRIPTION_STATUS.SKIP)
                    && (
                      <button
                        type="button"
                        onClick={() => this.setState({ showModal: true, isCancel: false })}
                      >
                        Pause
                      </button>
                    )
                  }
                  {
                    (statusUpperCase === SUBSCRIPTION_STATUS.PAUSE)
                    && (
                      <button
                        type="button"
                        onClick={() => this.setState({ showModal: true, isCancel: false })}
                      >
                        Delivery Frequency
                      </button>
                    )
                  }
                  {
                    (statusUpperCase === SUBSCRIPTION_STATUS.SKIP)
                    && (
                      <button
                        type="button"
                        onClick={() => this.handleChangeStatus(updateSubscription, statusObj.active)}
                      >
                        Un-skip
                      </button>
                    )
                  }
                  {
                    (statusUpperCase === SUBSCRIPTION_STATUS.PAUSE)
                    && (
                      <button
                        type="button"
                        onClick={() => this.handleChangeStatus(updateSubscription, statusObj.active)}
                      >
                        Un-pause
                      </button>
                    )
                  }
                </div>)
          }
          {
            (statusUpperCase === SUBSCRIPTION_STATUS.ACTIVE
              || statusUpperCase === SUBSCRIPTION_STATUS.SKIP
              || statusUpperCase === SUBSCRIPTION_STATUS.PAUSE)
            && (
              <div>
                <button
                  type="button"
                  onClick={() => this.setState({ showModal: true, isCancel: true })}
                >
                  Cancel
                </button>
              </div>)
          }
          {
            (statusUpperCase === SUBSCRIPTION_STATUS.EXPIRED
              || statusUpperCase === SUBSCRIPTION_STATUS.CANCELLED)
            && (
              <button
                type="button"
                onClick={() => this.handleChangeStatus(updateSubscription, statusObj.active)}
              >
                Reactivate
              </button>)
          }
        </div>
      );
    }

    return (
      <div>
        You are not subscribed. Click
        <Link to="/quiz"> here </Link>
         to start your adventure.
      </div>
    );
  };

  render() {
    const { props, state } = this;
    const { subscription } = props.me;
    const hasSubscription = !!subscription;
    const statusId = hasSubscription && subscription.subscriptionStatus.id;
    const statusUpperCase = statusId && SUBSCRIPTION_STATUS_ID_TO_NAME[statusId];
    const statusName = hasSubscription && subscription.subscriptionStatus.name;
    const monthFrequency = hasSubscription && subscription.monthFrequency;
    let holdUntilDay;
    let holdUntilDate;
    let holdUntilMonth;
    let holdUntilDateObj;

    if (hasSubscription && subscription.holdUntilDate) {
      holdUntilDateObj = new Date(subscription.holdUntilDate);
      holdUntilDay = holdUntilDateObj.getDate();
      holdUntilMonth = MONTH_NAMES[holdUntilDateObj.getMonth()];
      holdUntilDate = `${holdUntilDay} ${holdUntilMonth}`;
    }

    return (
      <Mutation mutation={UPDATE_SUBSCRIPTION} refetchQueries={() => [{ query: GET_MEMBER }]}>
        {(updateSubscription, { error }) => {
          if (error) {
            error.graphQLErrors.map(message => console.error('Non-friendly error message', message.message));
          }
          return (
            <div className="SubscriptionStatus">
              <h2>Update Subscription Status</h2>
              <div className="SubscriptionStatus--container">
                <div className="SubscriptionStatus--title">
                  {subscription && <div>Your subscription status:</div>}
                  <h3
                    className={
                      `SubscriptionStatus--status
                      ${statusId && SUBSCRIPTION_STATUS_ID_TO_NAME[statusId].toLowerCase()}`
                    }
                  >
                    {statusName}
                  </h3>
                  {
                    statusUpperCase === SUBSCRIPTION_STATUS.PAUSE
                    && (
                      <span>
                        {`Until ${holdUntilDate}`}
                      </span>
                    )
                  }
                  {
                    monthFrequency && monthFrequency > 1
                    && (
                      <span>
                        {`delivered every ${monthFrequency} months`}
                      </span>
                    )
                  }
                  {!state.showModal && this.renderCallToActions(statusUpperCase, updateSubscription)}
                  {state.showModal && this.renderModal(updateSubscription)}
                </div>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default SubscriptionStatus;
