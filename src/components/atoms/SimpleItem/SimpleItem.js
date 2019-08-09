import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SimpleItem.scss';

/**
 * Renders item for a list
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SimpleItem extends Component {
  static propTypes = {
    item: PropTypes.shape({ id: PropTypes.string.isRequired }),
    name: PropTypes.string,
  };

  static defaultProps = {
    item: null,
    name: '',
  };

  static contextTypes = {};

  componentDidMount() {}

  /**
   * Iterates through all the properties in the object and render inside of list item
   *
   * @param index: number
   * @param property: string
   * @param item: object
   * @param propertiesLength: number
   *
   * @return {React.Component}: stateless component
   * */
  renderItemText = (index, property, item, propertiesLength) => {
    if (index !== propertiesLength - 1) {
      return (
        <p key={property + item.id}>
          {`${property}: ${item[property]}`}
        </p>
      );
    }
    return null;
  };

  render() {
    const { item, name } = this.props;
    const properties = item && Object.keys(item);

    return (
      <li key={name + item.id} className="SimpleItem">
        {properties.map((property, index) => this.renderItemText(index, property, item, properties.length))}
      </li>
    );
  }
}

export default SimpleItem;
