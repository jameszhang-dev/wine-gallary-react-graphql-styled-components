import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql, Query } from 'react-apollo';

import {
  ErrorBoundary,
  WineFilters,
  WineList,
  WineSorters,
  WineBox,
} from '../../components';
import { GET_AUTH, GET_SHOPPING_CART } from '../../graphql/queries';
import { FETCH_POLICY_CACHE_ONLY } from '../../helpers/constants';

import './Wines.scss';

/**
 * Renders wine list page.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Wines extends Component {
  static propTypes = {
    isWineSubscriptionBox: PropTypes.bool,
    authQuery: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    isWineSubscriptionBox: false,
  };

  state = {
    filters: {
      year: null,
      wineClassId: null,
      wineTypeId: null,
      wineBodyId: null,
      wineSweetnessId: null,
      wineTanninId: null,
      wineStyleId: null,
      wineProductionMethodId: null,
      seasonId: null,
      tasteId: null,
      foodId: null,
      countryId: null,
    },
  };

  handleFilters = filtersValue => {
    this.setState(prevState => (
      {
        filters: {
          ...prevState.filters,
          ...filtersValue,
        },
      }
    ));
  };

  render() {
    const { props, state } = this;
    const { isWineSubscriptionBox, authQuery } = props;
    let { filters } = state;

    // Specifies memberId to retrieve Member's predictions
    const memberId = authQuery.auth && authQuery.auth.memberId;
    if (memberId) {
      filters = { ...filters, memberId };
    }

    return (
      <div className="Wines">
        <section className="Wines--container">
          <div className="Wines__inner">
            {
              isWineSubscriptionBox && (
                <div>
                  <Query query={GET_SHOPPING_CART} partialRefetch>
                    {({ loading, error, data }) => {
                      if (loading) return 'Loading...';
                      if (error) console.error(`Error! ${error.message}`);
                      return (
                        <WineBox data={data} {...props} isEditing />
                      );
                    }}
                  </Query>
                </div>)
            }
            <div className="Wines--filters">
              <ErrorBoundary>
                <WineFilters onFilterChanges={this.handleFilters} />
              </ErrorBoundary>
            </div>

            <div className="Wines--filters">
              <ErrorBoundary>
                <WineSorters onSorterChanges={this.handleFilters} />
              </ErrorBoundary>
            </div>

            <div className="Wines--list">
              <ErrorBoundary>
                <WineList variables={filters} isWineSubscriptionBox={isWineSubscriptionBox} />
              </ErrorBoundary>
            </div>

          </div>
        </section>
      </div>
    );
  }
}

export default compose(
  graphql(GET_AUTH, { name: 'authQuery', options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY } }),
)(Wines);
