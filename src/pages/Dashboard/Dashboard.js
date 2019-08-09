import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { compose, graphql } from 'react-apollo';

import {
  MemberBadges,
  MemberProgress,
  SubscriptionSummary,
  WineOrderedCountries,
  PointsBoard,
} from '../../components';
import { GET_MEMBER } from '../../graphql/queries';
import urlPatterns from '../../urls';

import './Dashboard.scss';

/**
 * Renders Dashboard component.
 * */
const Dashboard = props => {
  const { meQuery } = props;
  return (
    <div className="Dashboard">
      {
        meQuery ? (
          <div className="Dashboard--container">
            <div className="Dashboard--links">
              <NavLink to={urlPatterns.MY_ORDERS}>My orders</NavLink>
            </div>
            <div className="Dashboard--sections">
              <h2 className="Dashboard--sections__title">Your Subscription</h2>
              <div className="Dashboard--sections__subscription-summary">
                <SubscriptionSummary data={meQuery} />
              </div>
            </div>
            <div className="Dashboard--sections">
              <div className="Dashboard--sections--stats">
                <div className="Dashboard--sections--stats__progress">
                  <MemberProgress me={meQuery.me} />
                </div>
                <div className="Dashboard--sections--stats__badges">
                  <MemberBadges me={meQuery.me} />
                </div>
              </div>
            </div>
            <div className="Dashboard--sections">
              <div className="Dashboard--sections--leaderboard">
                <PointsBoard />
              </div>
            </div>
            <div className="Dashboard--sections">
              <div className="Dashboard--sections--passport">
                <WineOrderedCountries data={meQuery} />
              </div>
            </div>
          </div>
        ) : (
          <div className="Dashboard--container">
            <div>Ooops, this is embarrassing... Something went wrong, try to reload your page.</div>
          </div>
        )
      }
    </div>
  );
};

Dashboard.propTypes = {
  meQuery: PropTypes.shape({}).isRequired,
};

export default compose(
  graphql(GET_MEMBER, {
    name: 'meQuery',
    options: {
      partialRefetch: true,
    },
  }),
)(Dashboard);
