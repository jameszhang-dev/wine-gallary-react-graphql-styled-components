import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { WINE_SORTER } from '../../../helpers/constants';

import './WineSorters.scss';

/**
 * Renders WineSorters component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineSorters extends Component {
  static propTypes = {
    onSorterChanges: PropTypes.func.isRequired,
  };

  state = {
    sorter: {
      order: 'COLOUR',
    },
    selections: null,
  };

  handleChangeFilter = response => {
    const { sorter, selections } = this.state;
    const { onSorterChanges } = this.props;

    const responseValue = response.value;
    const sorterConst = { ...sorter };
    sorterConst.order = responseValue;

    const sorterRaw = { ...selections };
    sorterRaw.order = response.value;

    this.setState({
      sorter: {
        ...sorterConst,
      },
      selections: {
        ...sorterRaw,
      },
    });
    onSorterChanges(sorterConst);
  };

  render() {
    const { state } = this;
    const { order } = state.sorter;
    const options = Object.keys(WINE_SORTER).map(sorterName => (
      {
        value: sorterName,
        label: WINE_SORTER[sorterName],
      }
    ));

    return (
      <div className="WineSorters">
        <div className="WineSorters--inner">
          <div className="WineSorters--filter">
            <Dropdown
              value={order}
              options={options}
              placeholder="Sort Wines By"
              onChange={this.handleChangeFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WineSorters;
