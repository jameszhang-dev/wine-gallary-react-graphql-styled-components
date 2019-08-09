import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import {
  CREATE_WINE_BLACKLIST_RULE,
  DELETE_WINE_BLACKLIST_RULE,
  GET_MEMBER,
} from '../../../graphql/resolvers/member';

import './WineBlacklistRule.scss';

/**
 * WineBlacklistRule component allows member to modify black list rules.
 * */
class WineBlacklistRule extends Component {
  static propTypes = {
    wineBlacklistType: PropTypes.shape({}).isRequired,
    memberRulesAsObject: PropTypes.shape({}).isRequired,
    memberId: PropTypes.number.isRequired,
    addWineBlacklistRule: PropTypes.func.isRequired,
    deleteWineBlacklistRule: PropTypes.func.isRequired,
  };

  /**
   * Sends mutation when checkbox is toggled.
   *
   * @param {Object} event
   * @param {Number} wineBlacklistTypeId
   * @param {Number} objectId
   */
  handleCheckBoxSelected = (event, wineBlacklistTypeId, objectId = null) => {
    const { addWineBlacklistRule, deleteWineBlacklistRule, memberId } = this.props;

    const isChecked = event.target.checked;

    // Adds or deletes blacklist rule depending on a checkbox's state
    if (isChecked) {
      addWineBlacklistRule({
        variables: {
          input: {
            memberId,
            wineBlacklistTypeId,
            objectId,
          },
        },
      });
    } else {
      deleteWineBlacklistRule({
        variables: {
          input: {
            memberId,
            wineBlacklistTypeId,
            objectId,
          },
        },
      });
    }
  };

  render() {
    const { wineBlacklistType, memberRulesAsObject } = this.props;
    const { choices } = wineBlacklistType;

    return (
      <div className="WineBlacklistRule">
        <div className="WineBlacklistRule--container">
          <h3 className="WineBlacklistRule--title">{wineBlacklistType.name}</h3>
          { choices ? (
            <div className="WineBlacklistRule--choices">
              {choices.map(choice => (
                <div key={choice.id}>
                  <input
                    key={choice.id}
                    type="checkbox"
                    value={choice.id}
                    onChange={event => this.handleCheckBoxSelected(event, wineBlacklistType.id, choice.id)}
                    defaultChecked={
                      memberRulesAsObject[wineBlacklistType.id]
                      && memberRulesAsObject[wineBlacklistType.id].objectIds.includes(choice.id)
                    }
                  />
                  {choice.name}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <input
                type="checkbox"
                key={wineBlacklistType.id}
                value={wineBlacklistType.id}
                onChange={event => this.handleCheckBoxSelected(event, wineBlacklistType.id)}
                defaultChecked={memberRulesAsObject[wineBlacklistType.id]}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(CREATE_WINE_BLACKLIST_RULE, {
    name: 'addWineBlacklistRule',
    options: {
      refetchQueries: () => [{ query: GET_MEMBER }],
    },
  }),
  graphql(DELETE_WINE_BLACKLIST_RULE, {
    name: 'deleteWineBlacklistRule',
    options: {
      refetchQueries: () => [{ query: GET_MEMBER }],
    },
  }),
)(WineBlacklistRule);
