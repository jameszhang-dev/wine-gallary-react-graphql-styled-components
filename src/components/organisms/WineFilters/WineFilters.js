import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Query } from 'react-apollo';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import {
  GET_FOODS,
  GET_SEASONS,
  GET_TASTES,
  GET_WINE_BODIES,
  GET_WINE_COLOURS,
  GET_WINE_COUNTRIES,
  GET_WINE_PRICE_POINTS,
  GET_WINE_PRODUCTIONS,
  GET_WINE_SWEETNESSES,
  GET_WINE_TANNINS,
  GET_WINE_TYPES,
} from '../../../graphql/queries';

import './WineFilters.scss';

/**
 * Renders WineFilters component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineFilters extends Component {
  static propTypes = {
    onFilterChanges: PropTypes.func,
  };

  static defaultProps = {
    onFilterChanges: null,
  };

  state = {
    filters: {
      year: null,
      winePricePointId: null,
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
    selections: {
      year: null,
      winePricePointId: null,
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

  handleChangeFilter = response => {
    const { filters, selections } = this.state;
    const { onFilterChanges } = this.props;

    const responseValueJson = JSON.parse(response.value);
    const filterConst = { ...filters };
    filterConst[responseValueJson.group] = parseInt(responseValueJson.valueId, 10);

    const filterRaw = { ...selections };
    filterRaw[responseValueJson.group] = response.value;

    this.setState({
      filters: {
        ...filterConst,
      },
      selections: {
        ...filterRaw,
      },
    });
    if (!filterConst[responseValueJson.group]) filterConst[responseValueJson.group] = null;
    onFilterChanges(filterConst);
  };

  render() {
    const { selections } = this.state;
    const {
      winePricePointId,
      wineClassId,
      wineBodyId,
      wineSweetnessId,
      wineTanninId,
      wineTypeId,
      wineProductionMethodId,
      seasonId,
      tasteId,
      foodId,
      countryId,
    } = selections;

    return (
      <div className="WineFilters">
        <div className="WineFilters--inner">
          <div className="WineFilters--filter">
            <Query query={GET_WINE_BODIES}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'wineBodyId',
                    valueId: null,
                  }),
                  label: 'All bodies',
                }];
                const options = clearOption.concat(data.allWineBodies.map(item => ({
                  value: JSON.stringify({
                    group: 'wineBodyId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Wine body"
                    onChange={this.handleChangeFilter}
                    value={wineBodyId}
                  />
                );
              }}
            </Query>
          </div>
          <div className="WineFilters--filter">
            <Query query={GET_WINE_TANNINS}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'wineTanninId',
                    valueId: null,
                  }),
                  label: 'All tannins',
                }];
                const options = clearOption.concat(data.allWineTannins.map(item => ({
                  value: JSON.stringify({
                    group: 'wineTanninId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Wine tannin"
                    onChange={this.handleChangeFilter}
                    value={wineTanninId}
                  />);
              }}
            </Query>
          </div>
          <div className="WineFilters--filter">
            <Query query={GET_WINE_SWEETNESSES}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'wineSweetnessId',
                    valueId: null,
                  }),
                  label: 'All sweetnesses',
                }];
                const options = clearOption.concat(data.allWineSweetnesses.map(item => ({
                  value: JSON.stringify({
                    group: 'wineSweetnessId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Wine sweetness"
                    onChange={this.handleChangeFilter}
                    value={wineSweetnessId}
                  />);
              }}
            </Query>
          </div>
          <div className="WineFilters--filter">
            <Query query={GET_WINE_PRICE_POINTS}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'winePricePointId',
                    valueId: null,
                  }),
                  label: 'All prices',
                }];
                const options = clearOption.concat(data.allWinePricePoints.map(item => ({
                  value: JSON.stringify({
                    group: 'winePricePointId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Price"
                    onChange={this.handleChangeFilter}
                    value={winePricePointId}
                  />);
              }}
            </Query>
          </div>
          <div className="WineFilters--filter">
            <Query query={GET_WINE_TYPES}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'wineTypeId',
                    valueId: null,
                  }),
                  label: 'All grape types',
                }];
                const options = clearOption.concat(data.allWineTypes.map(item => ({
                  value: JSON.stringify({
                    group: 'wineTypeId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Grape type"
                    onChange={this.handleChangeFilter}
                    value={wineTypeId}
                  />);
              }}
            </Query>
          </div>
          <div className="WineFilters--filter">
            <Query query={GET_WINE_COLOURS}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'wineClassId',
                    valueId: null,
                  }),
                  label: 'All wine colours',
                }];
                const options = clearOption.concat(data.allWineClasses.map(item => ({
                  value: JSON.stringify({
                    group: 'wineClassId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Wine colour"
                    onChange={this.handleChangeFilter}
                    value={wineClassId}
                  />
                );
              }}
            </Query>
          </div>
          <div className="WineFilters--filter">
            <Query query={GET_WINE_PRODUCTIONS}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'wineProductionMethodId',
                    valueId: null,
                  }),
                  label: 'All production methods',
                }];
                const options = clearOption.concat(data.allWineProductionMethods.map(item => ({
                  value: JSON.stringify({
                    group: 'wineProductionMethodId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Production Method"
                    onChange={this.handleChangeFilter}
                    value={wineProductionMethodId}
                  />
                );
              }}
            </Query>
          </div>
          <div className="WineFilters--filter">
            <Query query={GET_SEASONS}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'seasonId',
                    valueId: null,
                  }),
                  label: 'All seasons',
                }];
                const options = clearOption.concat(data.allSeasons.map(item => ({
                  value: JSON.stringify({
                    group: 'seasonId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Season"
                    onChange={this.handleChangeFilter}
                    value={seasonId}
                  />
                );
              }}
            </Query>
          </div>
          <div className="WineFilters--filter">
            <Query query={GET_FOODS}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'foodId',
                    valueId: null,
                  }),
                  label: 'All foods',
                }];
                const options = clearOption.concat(data.allFoods.map(item => ({
                  value: JSON.stringify({
                    group: 'foodId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Food"
                    onChange={this.handleChangeFilter}
                    value={foodId}
                  />);
              }}
            </Query>
          </div>
          <div className="WineFilters--filter">
            <Query query={GET_TASTES}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'tasteId',
                    valueId: null,
                  }),
                  label: 'All tastes',
                }];
                const options = clearOption.concat(data.allTastes.map(item => ({
                  value: JSON.stringify({
                    group: 'tasteId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Taste"
                    onChange={this.handleChangeFilter}
                    value={tasteId}
                  />);
              }}
            </Query>
          </div>
          <div className="WineFilters--filter">
            <Query query={GET_WINE_COUNTRIES}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;
                const clearOption = [{
                  value: JSON.stringify({
                    group: 'countryId',
                    valueId: null,
                  }),
                  label: 'All countries',
                }];
                const options = clearOption.concat(data.allWineCountries.map(item => ({
                  value: JSON.stringify({
                    group: 'countryId',
                    valueId: item.id,
                  }),
                  label: item.name,
                })));
                return (
                  <Dropdown
                    options={options}
                    placeholder="Country"
                    onChange={this.handleChangeFilter}
                    value={countryId}
                  />
                );
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

export default WineFilters;
