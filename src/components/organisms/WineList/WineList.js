import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import { GET_WINES } from '../../../graphql/queries';
import { WineItems } from '../..';

import './WineList.scss';

/**
 * Renders list container with title
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineList extends Component {
  static propTypes = {
    variables: PropTypes.shape(),
    isWineSubscriptionBox: PropTypes.bool,
  };

  static defaultProps = {
    variables: null,
    isWineSubscriptionBox: false,
  };

  render() {
    const { variables, isWineSubscriptionBox } = this.props;

    return (
      <div className="SimpleList">
        <h1>Wines</h1>
        <Query query={GET_WINES} variables={variables}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) console.error(`Error! ${error.message}`);
            if (data && data.allWines) {
              return (
                <WineItems data={data} isWineSubscriptionBox={isWineSubscriptionBox} />
              );
            }
            return (<div>Sorry something went wrong, try to come back later</div>);
          }}
        </Query>
      </div>
    );
  }
}

export default WineList;
