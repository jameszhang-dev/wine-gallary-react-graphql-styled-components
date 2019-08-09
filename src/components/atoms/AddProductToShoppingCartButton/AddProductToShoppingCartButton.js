import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { GET_AUTH } from '../../../graphql/resolvers/auth';
import { isLoggedIn } from '../../../helpers/auth';
import { FETCH_POLICY_CACHE_ONLY } from '../../../helpers/constants';
import { saveCartItemToLocalStorage } from '../../../helpers/tools';
import { GET_MEMBER, GET_SHOPPING_CART } from '../../../graphql/queries';
import { ADD_SHOPPING_CART_ITEM } from '../../../graphql/mutations';

import './AddProductToShoppingCartButton.scss';

/**
 * Renders AddProductToShoppingCartButton component that allows adding product to a Shopping Cart.
 * */
class AddProductToShoppingCartButton extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.number,
    label: PropTypes.string,
    authQuery: PropTypes.shape({}).isRequired,
    showShoppingCart: PropTypes.bool,
    callbackOnAdd: PropTypes.func,
    addShoppingCartItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    quantity: 1,
    label: 'Add',
    showShoppingCart: true,
    callbackOnAdd: null,
  };

  /**
   * Adds items to shopping cart
   * If user IS logged in, adds item to database's shopping cart
   * If user IS NOT logged in, adds item to browser local storage's shopping cart
   * @param {Object} product - product to be added
   * @return {Promise<void>}
   * */
  handleAddItemToShoppingCart = async product => {
    const { quantity, authQuery, addShoppingCartItem } = this.props;

    if (isLoggedIn()) {
      const memberId = authQuery.auth && authQuery.auth.memberId;
      if (!memberId) {
        console.error('User is logged in, but does not have a memberId in local storage.');
      } else {

        // Saves product to shopping cart database in case user is logged in
        addShoppingCartItem({
          variables: {
            input: {
              memberId,
              productId: product.id,
              quantity,
            },
          },
        }).then(() => {
          this.finaliseOperation();
        });
      }
    } else {

      // Saves product item to shopping cart in browser session in case user is not logged in
      const shoppingCartItem = {
        quantity,
        product: {
          id: product.id,
          name: product.name,
          sellingPrice: product.sellingPrice,
          productType: {
            id: product.productType.id,
          },
        },
      };
      await saveCartItemToLocalStorage(shoppingCartItem, true, false, false).then(() => {
        this.finaliseOperation();
      });
    }
  };

  /**
   * Executes all callbacks after product has been successfully added to the Shopping Cart.
   */
  finaliseOperation = () => {
    const { showShoppingCart, callbackOnAdd } = this.props;

    // TODO DEV-203: bind shopping cart counter to apollo-link-state variable
    window.shoppingCartRefresh();
    showShoppingCart && window.showShoppingCart();
    callbackOnAdd && callbackOnAdd();
  };

  render() {
    const { product, label } = this.props;

    return (
      <div className="AddProductToShoppingCartButton">
        <button
          type="button"
          onClick={() => this.handleAddItemToShoppingCart(product)}
        >
          {label}
        </button>
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(GET_AUTH, { name: 'authQuery', options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY } }),
  graphql(ADD_SHOPPING_CART_ITEM, {
    name: 'addShoppingCartItem',
    options: { refetchQueries: () => [{ query: GET_MEMBER }, { query: GET_SHOPPING_CART }] },
  }),
)(AddProductToShoppingCartButton);
