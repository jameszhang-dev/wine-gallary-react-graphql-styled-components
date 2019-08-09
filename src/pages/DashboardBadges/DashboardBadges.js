import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import { BADGE_CATEGORY_ID, FETCH_POLICY_CACHE_ONLY } from '../../helpers/constants';
import { MemberBadgesOfCategory } from '../../components';
import { GET_AUTH } from '../../graphql/queries';

import './DashboardBadges.scss';

/**
 * Renders DashboardBadges component.
 * */
const DashboardBadges = props => {

  const { authQuery } = props;
  const memberId = authQuery.auth && authQuery.auth.memberId;

  return (
    <div className="DashboardBadges">
      <div className="DashboardBadges--container">
        {Object.entries(BADGE_CATEGORY_ID).map(([badgeCategoryId, badgeCategoryName]) => (
          <MemberBadgesOfCategory
            key={badgeCategoryId}
            badgeCategoryId={parseInt(badgeCategoryId, 10)}
            badgeCategoryName={badgeCategoryName}
            memberId={memberId}
          />
        ))}
      </div>
    </div>
  );
};

DashboardBadges.propTypes = {
  authQuery: PropTypes.shape({}).isRequired,
};

export default compose(
  graphql(GET_AUTH, { name: 'authQuery', options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY } }),
)(DashboardBadges);
