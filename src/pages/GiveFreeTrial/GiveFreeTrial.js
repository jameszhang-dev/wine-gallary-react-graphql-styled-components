import React from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { GiveFreeTrialForm } from '../../components';
import { GET_MEMBER } from '../../graphql/queries';

import './GiveFreeTrial.scss';

/**
 * Renders GiveFreeTrial component which will provide different ways of sending a
 * free trial invite to friends.
 * */
const GiveFreeTrial = props => {
  const { meQuery } = props;

  if (meQuery.loading || !meQuery.me) {
    return <div>Loading...</div>;
  }

  if (meQuery.me && !meQuery.me.availableSubscriptionGiveaways.length) {
    return <h1>Sorry, you have no invites left.</h1>;
  }

  return (
    <div className="GiveFreeTrial">
      <div className="GiveFreeTrial--container">

        <section className="GiveFreeTrial--title">
          <h1>Gift a Free-Trial to a special someone..</h1>
          <h2>You’ve gained special status here at the Wine Gallery.</h2>
          <p>
            Because you’ve been a loyal wine gallery member for a little while now, we want to send some
            love right-back-at-you by giving you the chance to gift a free wine box to a special
            wine-loving friend.
            <br />
            So think carefully about who you want to share your wine journey with and once you’ve decided
            just choose one of the options below.
            <br />
            All your friend will have to pay for on their first box is the shipping cost. They will be
            signed up for monthly deliveries (that’s how we can afford to do this), but they can of course
            cancel any time.
          </p>
        </section>

        {meQuery.me && meQuery.me.availableSubscriptionGiveaways.map((subscriptionGiveaway, index) => (
          <GiveFreeTrialForm
            key={subscriptionGiveaway.code}
            me={meQuery.me}
            subscriptionGiveaway={subscriptionGiveaway}
            counter={index}
          />
        ))}

      </div>
    </div>
  );
};

GiveFreeTrial.propTypes = {
  meQuery: PropTypes.shape({}).isRequired,
};

export default compose(
  graphql(GET_MEMBER, { name: 'meQuery' }),
)(GiveFreeTrial);
