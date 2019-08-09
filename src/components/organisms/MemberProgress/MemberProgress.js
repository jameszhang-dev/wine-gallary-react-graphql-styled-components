import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './MemberProgress.scss';

/**
 * Renders MemberProgress component.
 * */
const MemberProgress = props => {

  const { me } = props;
  if (!me) return <div>Loading</div>;

  const pointsToNextLevel = me.nextBadge.badgerulesSet[0].quantity - me.points;

  return (
    <div className="MemberProgress">
      <div className="MemberProgress--container">
        <h3 className="MemberProgress--title">
          {`your progress | ${me.points} points`}
        </h3>
        <div className="MemberProgress--current-level">
          <p>Current level:</p>
          {
            me.currentBadge
              ? (
                <div>
                  <img src={me.currentBadge.imageSmallUrl} alt={me.currentBadge.name} />
                  <p>{me.currentBadge.name}</p>
                </div>
              )
              : <span>--</span>
          }
        </div>
        <div className="MemberProgress--next-level">
          <p>Next level:</p>
          <img src={me.nextBadge.imageSmallUrl} alt={me.nextBadge.name} />
          <p>{me.nextBadge.name}</p>
        </div>
        <div>
          <p>{`${me.points} / ${me.nextBadge.badgerulesSet[0].quantity}`}</p>
          <p>{`${pointsToNextLevel} points needed.`}</p>
        </div>
        <button
          type="button"
          onClick={() => console.log('Navigate to My Rewards')}
        >
          view rewards history
        </button>
      </div>
    </div>
  );
};

MemberProgress.propTypes = {
  me: PropTypes.shape({
    points: PropTypes.number.isRequired,
    currentBadge: PropTypes.shape({ }),
    nextBadge: PropTypes.shape({ }).isRequired,
  }).isRequired,
};

export default withRouter(MemberProgress);
