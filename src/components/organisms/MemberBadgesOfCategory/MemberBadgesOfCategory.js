import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { GET_MEMBER_BADGES_BY_CATEGORY } from '../../../graphql/queries';

import './MemberBadgesOfCategory.scss';

/**
 * Renders MemberBadgesOfCategory component.
 * */
class MemberBadgesOfCategory extends Component {

  static propTypes = {
    badgeCategoryName: PropTypes.string.isRequired,
    memberBadgesQuery: PropTypes.shape({}).isRequired,
  };

  paginationLimit = 10;

  state = {
    isEverythingLoaded: false,
  };

  /**
   * Fetches more Badges.
   * @param {Function} fetchMore
   * @param {Object} data
   */
  fetchMoreBadges = (fetchMore, data) => {
    const currentDataLength = data.memberBadgesByCategory.length;

    fetchMore({
      variables: {
        offset: currentDataLength,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const updatedBadges = {
          memberBadgesByCategory: [...prev.memberBadgesByCategory, ...fetchMoreResult.memberBadgesByCategory],
        };
        if (fetchMoreResult.memberBadgesByCategory.length < this.paginationLimit) {
          this.setState({ isEverythingLoaded: true }); // No more Badges to be retrieved
        }
        return Object.assign({}, prev, updatedBadges);
      },
    });
  };

  render() {
    const { isEverythingLoaded } = this.state;
    const { memberBadgesQuery, badgeCategoryName } = this.props;

    const { error, loading } = memberBadgesQuery;
    const data = memberBadgesQuery;

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
      <div className="MemberBadgesOfCategory">
        <div className="MemberBadgesOfCategory--section">
          <h2>{badgeCategoryName}</h2>
          <div className="MemberBadgesOfCategory--badges-list">
            {data.memberBadgesByCategory.map(badge => {
              const extraClassName = badge.isEarned ? '' : '__not-earned';
              return (
                <div key={badge.id} className={`MemberBadgesOfCategory--badge${extraClassName}`}>
                  <img src={badge.imageSmallUrl} alt={badge.name} />
                  <p>{badge.name}</p>
                </div>
              );
            })}
            {!isEverythingLoaded && (data.memberBadgesByCategory.length === this.paginationLimit) && (
              <button
                type="button"
                onClick={() => this.fetchMoreBadges(memberBadgesQuery.fetchMore, data)}
              >
                view more
              </button>
            )}
          </div>
        </div>

      </div>
    );
  }
}

const ComposedMemberBadgesOfCategory = compose(
  graphql(GET_MEMBER_BADGES_BY_CATEGORY, {
    name: 'memberBadgesQuery',
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        memberId: props.memberId,
        badgeCategoryId: props.badgeCategoryId,
        badgeCategoryName: props.badgeCategoryName,
        limit: 10,
        offset: 0,
      },
    }),
  }),
)(MemberBadgesOfCategory);

ComposedMemberBadgesOfCategory.propTypes = {
  memberId: PropTypes.number.isRequired,
  badgeCategoryId: PropTypes.number.isRequired,
  badgeCategoryName: PropTypes.string.isRequired,
};

export default ComposedMemberBadgesOfCategory;
