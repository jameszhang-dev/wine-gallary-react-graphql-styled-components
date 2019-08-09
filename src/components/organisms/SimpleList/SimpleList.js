import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import { SimpleListItem } from '../..';

import './SimpleList.scss';

/**
 * Renders list container with title
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SimpleList extends Component {
  static propTypes = {
    query: PropTypes.shape(),
  };

  static defaultProps = {
    query: null,
  };

  static contextTypes = {};

  componentDidMount() {}

  render() {
    const { query } = this.props;

    return (
      <div className="SimpleList">
        <h1>This is the list of fabulous wine we have!</h1>

        {/* Queries wine list from database */}
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (

              // MOLECULE
              <SimpleListItem data={data} />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default SimpleList;
