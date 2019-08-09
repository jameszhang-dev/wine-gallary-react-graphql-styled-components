import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { GET_MEMBER, GET_WINE_COLOURS, GET_WINE_PRICE_POINTS } from '../../../graphql/queries';
import { UPDATE_WINE_PREFERENCE } from '../../../graphql/mutations';
import { ButtonMutation } from '../..';

import './WinePreference.scss';
import { FETCH_POLICY_NETWORK_ONLY } from '../../../helpers/constants';

/**
 * Renders WinePreference component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WinePreference extends Component {
  static propTypes = {
    wineQuantity: PropTypes.shape({}),
    winePricePointsQuery: PropTypes.shape({}).isRequired,
    wineClassesQuery: PropTypes.shape({}).isRequired,
    memberId: PropTypes.number.isRequired,
  };

  static defaultProps = {
    wineQuantity: null,
  };

  state = {
    errorMessage: null,
  };

  /**
   * Sets errors from mutations.
   * */
  handleSetErrors = error => {
    this.setState({ errorMessage: error });
  };

  /**
   * Calculate the total amount the user will spend in the subscription.
   * @return {Number} wineTotalAmount
   * */
  getTotalAmount = () => {
    const { wineQuantity } = this.props;
    if (!wineQuantity) return <div>Loading...</div>;
    const wineQuantities = wineQuantity.winequantitySet;

    // Reduces the object array to only the sum of totalBottles * winePricePoint.sellingPrice
    const wineTotalValue = wineQuantities.length && wineQuantities
      .map(item => (
        parseInt(item.numberOfBottles, 10) * parseInt(item.winePricePoint.sellingPrice, 10)
      ))
      .reduce((total, currentValue) => parseInt(total, 10) + currentValue);

    return wineTotalValue || 0;
  };

  /**
   * Calculates the total number of bottle per wineClass and pricePoint.
   * @param wineClassId
   * @param winePricePointId
   * @return {Number} numberOfBottles by wineClass and pricePoint
   * */
  getBottleQuantity = (wineClassId, winePricePointId) => {
    const { wineQuantity } = this.props;
    if (!wineQuantity) return <div>Loading...</div>;
    const wineQuantities = wineQuantity.winequantitySet;

    const wineQuantityItem = wineQuantities.length && wineQuantities.filter(item => (
      item.wineClass.id === wineClassId && item.winePricePoint.id === winePricePointId
    ));

    return wineQuantityItem[0] ? wineQuantityItem[0].numberOfBottles : 0;
  };

  render() {
    const { errorMessage } = this.state;
    const {
      winePricePointsQuery,
      wineClassesQuery,
      memberId,
    } = this.props;

    // Sorting the arrays we ensure the columns and rows are always matching for table headers
    const winePricePointArray = (
      winePricePointsQuery && winePricePointsQuery.allWinePricePoints
      && winePricePointsQuery.allWinePricePoints.sort((a, b) => a.id > b.id)
    );
    const wineClassesArray = (
      wineClassesQuery && wineClassesQuery.allWineClasses
      && wineClassesQuery.allWineClasses.sort((a, b) => a.id > b.id)
    );

    // Ensures when component is rendered it has pricePoint and wineClass queried
    if (!wineClassesArray || !winePricePointArray) return <div>Loading...</div>;
    return (
      <div className="WinePreference">
        <h2>Wine Preferences</h2>
        {errorMessage && errorMessage}
        <table className="table-wine-quantity" border="2">
          <tbody>
            <tr>
              <th>
              </th>
              {
                winePricePointArray.map(pricePointHeader => (
                  <th key={pricePointHeader.id}>{pricePointHeader.name}</th>
                ))
              }
            </tr>
            {
              wineClassesArray.map(wineClass => (
                <tr key={wineClass.id}>
                  <td>
                    {wineClass.name}
                  </td>
                  {
                    winePricePointArray.map(pricePoint => {

                      // Gets the number of bottles the user
                      const numberOfBottles = this.getBottleQuantity(wineClass.id, pricePoint.id);
                      return (
                        <td key={pricePoint.id}>
                          <div className="WinePreference--bottle">
                            <div className="WinePreference--bottle--counter">

                              {/* Decreases number of bottles for that wineClass in the princePoint */}
                              <ButtonMutation
                                label="-"
                                disabled={numberOfBottles < 1}
                                mutationProp={UPDATE_WINE_PREFERENCE}
                                input={{
                                  memberId,
                                  wineClassId: wineClass.id,
                                  winePricePointId: pricePoint.id,
                                  numberOfBottles: numberOfBottles - 1 >= 1 ? numberOfBottles - 1 : 0,
                                }}
                                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                                mutationPayloadName="updateMemberWineQuantity"
                                handleShowErrors={this.handleSetErrors}
                                onClick={() => this.setState({ errorMessage: null })}
                              />
                              {numberOfBottles}

                              {/* Increases number of bottles for that wineClass in the princePoint */}
                              <ButtonMutation
                                label="+"
                                mutationProp={UPDATE_WINE_PREFERENCE}
                                input={{
                                  memberId,
                                  wineClassId: wineClass.id,
                                  winePricePointId: pricePoint.id,
                                  numberOfBottles: numberOfBottles + 1,
                                }}
                                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                                onClick={() => this.setState({ errorMessage: null })}
                                handleShowErrors={this.handleSetErrors}
                                mutationPayloadName="updateMemberWineQuantity"
                              />
                            </div>
                          </div>
                        </td>
                      );
                    })
                  }
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td>{this.getTotalAmount()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default compose(
  graphql(GET_WINE_PRICE_POINTS, {
    name: 'winePricePointsQuery',
    options: {
      fetchPolicy: FETCH_POLICY_NETWORK_ONLY,
    },
  }),
  graphql(GET_WINE_COLOURS, {
    name: 'wineClassesQuery',
    options: {
      fetchPolicy: FETCH_POLICY_NETWORK_ONLY,
    },
  }),
)(WinePreference);
