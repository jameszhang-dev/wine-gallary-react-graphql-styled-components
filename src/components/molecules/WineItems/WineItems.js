import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { ADD_WINE_TO_QUIZ_BOX } from '../../../graphql/mutations';
import { GET_SHOPPING_CART } from '../../../graphql/queries';
import { DEFAULT_BOTTLE_URL, FETCH_POLICY_CACHE_ONLY } from '../../../helpers/constants';
import { GET_AUTH } from '../../../graphql/resolvers/auth';
import urlPatterns from '../../../urls';
import { AddProductToShoppingCartButton, AddWineToList, ButtonMutation } from '../..';

import './WineItems.scss';

/**
 * Renders WineItems component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineItems extends Component {
  static propTypes = {
    data: PropTypes.shape({}),
    isWineSubscriptionBox: PropTypes.bool,
    authQuery: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    data: null,
    isWineSubscriptionBox: false,
  };

  state = {
    showNotification: false,
  };

  /**
   * Renders wine item details
   * @param {Object} wine - product to be shown in listing
   * @return {React.Component}
   * */
  renderWineItem = wine => {
    const { isWineSubscriptionBox, authQuery } = this.props;
    const { showNotification } = this.state;
    const memberId = authQuery.auth && authQuery.auth.memberId;

    // Gets wine's photo URL or sets the default one if it doesn't exist
    const photoUrl = wine.product.productPhotos.length
      ? wine.product.productPhotos[0].photoWineListing
      : DEFAULT_BOTTLE_URL;

    const memberLikelihood = wine.memberLikelihood
      ? `${((wine.memberLikelihood) * 100)}%`
      : '-';

    return (
      <div
        key={wine.id}
      >
        {showNotification && this.renderNotification()}
        <Link rel="canonical" to={urlPatterns.WINE_DETAILS(wine.product.slug)}>
          <div className="WineItems--image">
            <img src={photoUrl} alt="" />
          </div>
          {wine.product.name}
          <br />
          {wine.wineType.wineClass.name}
          |
          {wine.wineType.name}
          <br />
          {wine.country.name}
          |
          {wine.year}
        </Link>
        <div>{`$${wine.product.sellingPrice}`}</div>
        <div>{memberLikelihood}</div>
        {

          // Renders different buttons depending on the page the user is visiting
          isWineSubscriptionBox
            ? (

              // Adds the wine to subscription
              <ButtonMutation
                label="Add"
                mutationProp={ADD_WINE_TO_QUIZ_BOX}
                reFetchQueriesProp={[{ query: GET_SHOPPING_CART }]}
                input={{ wineId: wine.id, memberId }}
              />)

            // Adds the wine to the shopping cart as one-off purchase
            : (<AddProductToShoppingCartButton product={wine.product} />)
        }

        <AddWineToList wine={wine} />

      </div>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <div
        className="WineItems"
      >
        <div>
          {data.allWines && data.allWines.map(wine => (
            this.renderWineItem(wine)
          ))}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(GET_AUTH, { name: 'authQuery', options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY } }),
)(WineItems);
