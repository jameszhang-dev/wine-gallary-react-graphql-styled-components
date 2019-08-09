import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { GET_ALL_WINE_BLACKLIST_TYPES } from '../../../graphql/queries';
import { WineBlacklistRule } from '../..';

import './WineBlacklist.scss';

/**
 * WineBlacklist component lists all member black list rules.
 * */
class WineBlacklist extends Component {
  static propTypes = {
    me: PropTypes.shape({}).isRequired,
    allWineBlacklistTypesQuery: PropTypes.shape({}).isRequired,
  };

  render() {
    const { me, allWineBlacklistTypesQuery } = this.props;
    const { allWineBlacklistTypes, loading } = allWineBlacklistTypesQuery;
    const memberRules = me.wineblacklistSet;

    // Saves member's choices to an object to retrieve them when rendering all blacklist rules
    const memberRulesAsObject = {};
    memberRules.forEach(rule => {
      const { objectId } = rule;
      if (objectId) {
        const currentObjectIds = (
          memberRulesAsObject[rule.wineBlacklistType.id]
          && memberRulesAsObject[rule.wineBlacklistType.id].objectIds
        ) || [];
        memberRulesAsObject[rule.wineBlacklistType.id] = {
          checked: true, objectIds: [...currentObjectIds, objectId],
        };
      } else {
        memberRulesAsObject[rule.wineBlacklistType.id] = { checked: true, objectIds: [] };
      }
    });

    if (loading) return 'Loading...';
    return (
      <div className="WineBlacklist">
        <div className="WineBlacklist--container">
          <h2>Blacklist - choose the wine types you wish to avoid</h2>
          {allWineBlacklistTypes.map(blacklistType => (
            <WineBlacklistRule
              key={blacklistType.id}
              wineBlacklistType={blacklistType}
              memberId={me.id}
              memberRulesAsObject={memberRulesAsObject}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(GET_ALL_WINE_BLACKLIST_TYPES, { name: 'allWineBlacklistTypesQuery' }),
)(WineBlacklist);
