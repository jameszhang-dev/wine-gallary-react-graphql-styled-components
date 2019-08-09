import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { compose, graphql } from 'react-apollo';

import { GET_AUTH } from '../../../graphql/resolvers/auth';
import { isLoggedIn } from '../../../helpers/auth';
import { FETCH_POLICY_CACHE_ONLY } from '../../../helpers/constants';
import { saveCartItemToLocalStorage } from '../../../helpers/tools';
import { GET_MEMBER, GET_SHOPPING_CART } from '../../../graphql/queries';
import { DELETE_SHOPPING_CART_ITEM } from '../../../graphql/mutations';

import './DeleteProductFromShoppingCartButton.scss';

/**
 * Renders DeleteProductFromShoppingCartButton component that allows removing product from a Shopping Cart.
 * */
class DeleteProductFromShoppingCartButton extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    label: PropTypes.string,
    authQuery: PropTypes.shape({}).isRequired,
    deleteShoppingCartItem: PropTypes.func.isRequired,
    callbackOnDelete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    label: 'Delete',
  };

  /**
   * Adds items to shopping cart
   * If user IS logged in, adds item to database's shopping cart
   * If user IS NOT logged in, adds item to browser local storage's shopping cart
   * @param {Object} product - product to be added
   * @return {Promise<void>}
   * */
  handleDeleteItemFromShoppingCart = async product => {
    const { authQuery, deleteShoppingCartItem } = this.props;

    if (isLoggedIn()) {
      const memberId = authQuery.auth && authQuery.auth.memberId;
      if (!memberId) {
        console.error('User is logged in, but does not have a memberId in local storage.');
      } else {

        //  Saves product to shopping cart database in case user is logged in
        deleteShoppingCartItem({
          variables: {
            input: {
              memberId,
              productId: product.id,
            },
          },
        }).then(() => {
          this.finaliseOperation();
        });
      }
    } else {

      //  Saves product item to shopping cart in browser session in case user is not logged in
      const shoppingCartItem = {
        product: {
          id: product.id,
          name: product.name,
          sellingPrice: product.sellingPrice,
          productType: {
            id: product.productType.id,
          },
        },
      };
      await saveCartItemToLocalStorage(shoppingCartItem, false, false, true).then(() => {
        this.finaliseOperation();
      });
    }
  };

  /**
   * Executes all callbacks after product has been successfully removed from the Shopping Cart.
   */
  finaliseOperation = () => {
    const { callbackOnDelete } = this.props;

    // TODO DEV-203: bind shopping cart counter to apollo-link-state variable
    window.shoppingCartRefresh();
    callbackOnDelete && callbackOnDelete();
  };

  render() {
    const { product, label } = this.props;

    return (
      <div className="DeleteProductFromShoppingCartButton">
        <button
          type="button"
          onClick={() => this.handleDeleteItemFromShoppingCart(product)}
        >
          {label}
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(GET_AUTH, { name: 'authQuery', options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY } }),
  graphql(DELETE_SHOPPING_CART_ITEM, {
    name: 'deleteShoppingCartItem',
    options: { refetchQueries: () => [{ query: GET_MEMBER }, { query: GET_SHOPPING_CART }] },
  }),
)(DeleteProductFromShoppingCartButton);
