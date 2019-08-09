import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { compose, graphql } from 'react-apollo';

import { ADD_WINE_TO_WINE_LIST, REMOVE_WINE_FROM_WINE_LIST } from '../../../graphql/mutations';

import './WineListSelectionItem.scss';

/**
 * Renders a WineList item for the given member and wine with the option to add or remove.
 * */
class WineListSelectionItem extends Component {

  static propTypes = {
    memberId: PropTypes.number.isRequired,
    wine: PropTypes.shape({}).isRequired,
    wineList: PropTypes.shape({}).isRequired,
    addWineToWineList: PropTypes.func.isRequired,
    removeWineFromWineList: PropTypes.func.isRequired,
  };

  /**
   * Sends mutation when checkbox is toggled to add or remove wine from the given list.
   *
   * @param {Object} event
   */
  handleCheckBoxSelected = event => {

    const {
      addWineToWineList,
      removeWineFromWineList,
      memberId,
      wine,
      wineList,
    } = this.props;

    if (event.target.checked) {
      addWineToWineList({
        variables: {
          input: {
            wineListId: wineList.id,
            wineId: wine.id,
            memberId,
          },
        },
      });
    } else {
      removeWineFromWineList({
        variables: {
          input: {
            wineListId: wineList.id,
            wineId: wine.id,
            memberId,
          },
        },
      });
    }
  };

  render() {

    const { wine, wineList } = this.props;
    const selectedWineLists = [];
    const elementId = `wine-list-${wine.id}-${wineList.id}`;

    if (wine.memberWineLists) {
      wine.memberWineLists.map(memberWineList => (
        selectedWineLists.push(memberWineList.id)
      ));
    }

    return (
      <div className="WineListSelectionItem--container">
        <label htmlFor={elementId}>
          {wineList.name}
          <input
            type="checkbox"
            id={elementId}
            value={wineList.id}
            onChange={event => this.handleCheckBoxSelected(event)}
            defaultChecked={selectedWineLists && selectedWineLists.includes(wineList.id)}
          />
        </label>
      </div>
    );
  }
}

export default compose(
  graphql(ADD_WINE_TO_WINE_LIST, {
    name: 'addWineToWineList',
  }),
  graphql(REMOVE_WINE_FROM_WINE_LIST, {
    name: 'removeWineFromWineList',
  }),
)(WineListSelectionItem);
