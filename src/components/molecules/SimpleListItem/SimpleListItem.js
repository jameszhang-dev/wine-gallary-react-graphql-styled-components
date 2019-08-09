import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SimpleItem } from '../..';

import './SimpleListItem.scss';

/**
 * Renders a list with items
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SimpleListItem extends Component {
  static propTypes = {
    data: PropTypes.shape({ allWines: PropTypes.array }),
  };

  static defaultProps = {
    data: null,
  };

  static contextTypes = {};

  componentDidMount() {}

  render() {
    const { data } = this.props;

    return (
      <div className="SimpleListItem">
        <ul>
          {data.allWines.map(wine => (

            // ATOM
            <SimpleItem key={`winesItems${wine.id}`} name="wines" item={wine} />
          ))}
        </ul>
      </div>
    );
  }
}

export default SimpleListItem;
