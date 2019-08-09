import React, { Component } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { FilterWinesHolder, FilterWinesToggleButton } from '../..';

class FilterWines extends Component {
  state = {
    filterWinesIsOpen: false,
  };

  toggleFilterWines = () => {
    this.setState(prevState => ({
      filterWinesIsOpen: !prevState.filterWinesIsOpen,
    }));
  };

  render() {
    const { filterWinesIsOpen } = this.state;

    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({
            filterWinesIsOpen: false,
          });
        }}
      >
        <FilterWinesHolder
          filterWinesIsOpen={filterWinesIsOpen}
          toggleFilterWines={this.toggleFilterWines}
        />
        <FilterWinesToggleButton
          toggleFilterWines={this.toggleFilterWines}
          filterWinesIsOpen={filterWinesIsOpen}
        />
      </OutsideClickHandler>
    );
  }
}

export default FilterWines;
