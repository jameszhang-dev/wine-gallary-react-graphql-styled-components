import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import urlPatterns from '../../../urls';

import './MemberBadges.scss';

/**
 * Renders MemberBadges component.
 * */
const MemberBadges = props => {

  const { me, history } = props;
  if (!me) return <div>Loading</div>;

  return (
    <div className="MemberBadges">
      <div className="MemberBadges--container">
        <div className="MemberBadges--latest">
          <p>Latest achievement:</p>
          {
            me.latestBadge
              ? (
                <div>
                  <img src={me.latestBadge.imageSmallUrl} alt={me.latestBadge.name} />
                  <p>{me.latestBadge.name}</p>
                </div>
              )
              : <span>--</span>
          }
          <button
            type="button"
            onClick={() => history.push(urlPatterns.DASHBOARD_BADGES)}
          >
            view all badges
          </button>
        </div>
        <div className="MemberBadges--next-up">
          <p>Next up:</p>
          {
            me.lockedBadges.map(lockedBadge => (
              <div key={lockedBadge.id}>
                <img src={lockedBadge.imageSmallUrl} alt={lockedBadge.name} />
                <p>{lockedBadge.name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

MemberBadges.propTypes = {
  history: PropTypes.shape({}).isRequired,
  me: PropTypes.shape({
    latestBadge: PropTypes.shape({ }),
    lockedBadges: PropTypes.arrayOf(PropTypes.shape({ })).isRequired,
  }).isRequired,
};

export default withRouter(MemberBadges);
