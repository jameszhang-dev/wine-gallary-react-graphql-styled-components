import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';

import { GET_TOP_MEMBERS } from '../../../graphql/resolvers/member';

import './PointsBoard.scss';

/**
 * Renders PointsBoard component.
 * */
const PointsBoard = () => {

  const limit = 10;
  const offset = 0;

  return (
    <div className="PointsBoard">
      <div className="PointsBoard--container">
        <h1>Winesquad Points Board</h1>

        <Query query={GET_TOP_MEMBERS} variables={{ limit, offset }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) console.error(`Error! ${error.message}`);
            if (data && data.topMembers) {
              return (
                <div className="PointsBoard--list">
                  {
                    data.topMembers.map(member => (
                      <div className="PointsBoard--item" key={member.id}>
                        <div className="PointsBoard--item--image">
                          <img
                            src={member.avatarThumbnailUrl}
                            alt={member.slug}
                          />
                        </div>
                        <div className="PointsBoard--item--description">
                          {`${member.firstName}  ${member.lastName}`}
                          <span className="points">
                            {`${member.points}  points`}
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              );
            }
            return (<div>Sorry something went wrong, try to come back later</div>);
          }}
        </Query>

      </div>
    </div>
  );
};

export default withRouter(PointsBoard);
