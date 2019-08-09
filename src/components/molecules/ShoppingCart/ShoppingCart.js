import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Modal, { closeStyle } from 'simple-react-modal';
import { Query } from 'react-apollo';

import { DELETE_SHOPPING_CART_ITEM, UPDATE_SHOPPING_CART_ITEM } from '../../../graphql/mutations';
import { GET_MEMBER, GET_SHOPPING_CART } from '../../../graphql/queries';
import { isLoggedIn } from '../../../helpers/auth';
import { PRODUCT_TYPE_IDS } from '../../../helpers/constants';
import { formatNumber, saveCartItemToLocalStorage, shoppingCartLocalStorage } from '../../../helpers/tools';
import urlPatterns from '../../../urls';
import { ButtonMutation } from '../..';

import shoppingCartIcon from '../../../assets/images/the-wine-gallery-box-icon.png';
import './ShoppingCart.scss';

const INCREASE_QUANTITY = 'increaseQuantity';
const DECREASE_QUANTITY = 'decreaseQuantity';
const DELETE_PRODUCT = 'deleteProduct';

/**
 * Renders ShoppingCart component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class ShoppingCart extends Component {
  state = {
    showModal: false,
    isUpdated: false, // TODO DEV-203 remove this from component state and add to a link state variable
  };

  componentDidMount() {
    const { showModal } = this.state;

    // TODO DEV-203 bind these events to state variables
    window.shoppingCartRefresh = () => this.forceUpdate();
    window.showShoppingCart = () => this.setState({ showModal: !showModal });
  }

  /**
   * Handles removing products, or increasing/decreasing items quantity in shopping cart
   * @param {Object} item - shopping cart item to be updated
   * @param {string} action - action to be executed
   * */
  handleManageLocalStorageCartItem = (item, action) => {
    const { isUpdated } = this.state;

    switch (action) {
      case DECREASE_QUANTITY:

        // Decreases the quantity of items of that specific product in shopping cart
        saveCartItemToLocalStorage(item, false, true, false).then(() => {

          // Updates shopping cart component
          this.setState({ isUpdated: !isUpdated });
        });
        break;
      case INCREASE_QUANTITY:

        // Increases the quantity of items of that specific product in shopping cart
        saveCartItemToLocalStorage(item, true, false, false).then(() => {

          // Updates shopping cart component
          this.setState({ isUpdated: !isUpdated });
        });
        break;

      case DELETE_PRODUCT:
      default:
        saveCartItemToLocalStorage(item, false, false, true).then(() => {

          // Updates shopping cart component
          this.setState({ isUpdated: !isUpdated });
        });
        break;
    }
  };

  /**
   * Renders and calculates badge counter to shopping cart icon
   * @param {Array} productsCartArray - products in shopping cart
   * @return {(React.Component|null)}
   * */
  renderCartCounter = productsCartArray => {
    const totalItems = productsCartArray && productsCartArray
      .map(item => item.quantity)
      .reduce((a, b) => a + b, 0);
    return totalItems >= 1 ? <span className="counter">{totalItems}</span> : null;
  };

  render() {
    const { showModal } = this.state;
    const shoppingCartLocal = shoppingCartLocalStorage();

    return (
      <Query query={GET_SHOPPING_CART} partialRefetch>
        {({ loading, error, data }) => {
          if (loading) return '';
          if (error) console.error(`Shopping cart error! ${error.message}`);
          const hasShoppingCartSet = Boolean(
            data && data.me && data.me.shoppingCart && data.me.shoppingCart.shoppingcartitemSet
          );
          const hasShoppingLocalStorage = Boolean(
            shoppingCartLocal && shoppingCartLocal.items.length
          );
          const shippingFee = (
            data && data.me && data.me.shoppingCart && data.me.shoppingCart.totalShippingFee
          );

          // TODO: Possibly change sorting to back end to improve FE performance
          // Result without sorting: https://www.useloom.com/share/781edb12b9b84d899b656e6d5bc0c30a
          let productsCartArray = null;
          let hasShippingFee = true;

          if (hasShoppingCartSet) {
            productsCartArray = data.me.shoppingCart.shoppingcartitemSet
              .sort((a, b) => a.product.id - b.product.id);
          } else if (hasShoppingLocalStorage) {
            productsCartArray = shoppingCartLocal.items.sort((a, b) => a.product.id - b.product.id);
          }

          // Verifies what type of products we have in the shopping cart
          if (productsCartArray) {
            const productTypes = productsCartArray
              .map(item => item.product.productType.id);

            // TODO [DEV-187] Validate this logic
            hasShippingFee = (
              !productTypes.includes(PRODUCT_TYPE_IDS.DB_ID_PRODUCT_TYPE_SPECIAL_PACK)
              || (
                !productTypes.includes(PRODUCT_TYPE_IDS.DB_ID_PRODUCT_TYPE_SPECIAL_PACK)
                || productTypes.includes(PRODUCT_TYPE_IDS.DB_ID_PRODUCT_TYPE_SUBSCRIPTION)
                || productTypes.includes(PRODUCT_TYPE_IDS.DB_ID_PRODUCT_TYPE_WINE)
              )
            );
          }

          return (
            <div className="ShoppingCart">
              <button
                type="button"
                onClick={() => this.setState({ showModal: true })}
                className="ShoppingCart--box-icon"
              >
                <img className="icon" src={shoppingCartIcon} alt="Shopping Cart" />
                {

                  // Checks if shopping cart from database is set, otherwise uses local storage
                  (hasShoppingCartSet || (
                    !isLoggedIn() && shoppingCartLocal && shoppingCartLocal.items
                    && shoppingCartLocal.items.length
                  )) && this.renderCartCounter(productsCartArray)
                }
              </button>
              <Modal
                style={{ background: 'rgba(0, 0, 0, 0.2)' }}
                containerStyle={{ width: '80%', maxWidth: 600 }}
                show={showModal}
                onClose={() => this.setState({ showModal: false })}
                closeOnOuterClick
                containerClassName="ShoppingCart--modal--container"
              >
                <div className="ShoppingCart--modal--container">
                  <ul className="ShoppingCart--modal--list">
                    {productsCartArray && productsCartArray.map(item => (
                      <li key={item.product.id} className="item">
                        {

                          // Removes product ITEM from shopping cart in local storage or db
                          hasShoppingCartSet
                            ? (
                              <ButtonMutation
                                input={{ memberId: data.me.id, productId: item.product.id }}
                                mutationProp={DELETE_SHOPPING_CART_ITEM}
                                reFetchQueriesProp={[{ query: GET_MEMBER }]}
                                label="x"
                              />
                            )
                            : (
                              <button
                                type="button"
                                onClick={
                                  () => this.handleManageLocalStorageCartItem(item, DELETE_PRODUCT)
                                }
                              >
                                X
                              </button>
                            )
                        }
                        {

                          // Shopping cart item description
                          `${item.product.name} | $${formatNumber(item.product.sellingPrice)}`
                        }
                        <div className="ShoppingCart--item-quantity">
                          {

                            // Removes product ITEM from shopping cart in local storage or db
                            hasShoppingCartSet
                              ? (
                                <ButtonMutation
                                  input={{
                                    memberId: data.me.id,
                                    productId: item.product.id,
                                    quantity: (item.quantity - 1),
                                  }}
                                  mutationProp={UPDATE_SHOPPING_CART_ITEM}
                                  reFetchQueriesProp={[{ query: GET_MEMBER }]}
                                  label="-"
                                />
                              )
                              : (
                                <button
                                  type="button"
                                  onClick={
                                    () => this.handleManageLocalStorageCartItem(item, DECREASE_QUANTITY)
                                  }
                                >
                                  -
                                </button>
                              )
                          }
                          {item.quantity}
                          {

                            // Adds product ITEM from shopping cart in local storage or db
                            hasShoppingCartSet
                              ? (
                                <ButtonMutation
                                  input={{
                                    memberId: data.me.id,
                                    productId: item.product.id,
                                    quantity: (item.quantity + 1),
                                  }}
                                  mutationProp={UPDATE_SHOPPING_CART_ITEM}
                                  reFetchQueriesProp={[{ query: GET_MEMBER }]}
                                  label="+"
                                />)
                              : (
                                <button
                                  type="button"
                                  onClick={
                                    () => this.handleManageLocalStorageCartItem(item, INCREASE_QUANTITY)
                                  }
                                >
                                  +
                                </button>
                              )
                          }
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div>
                    {
                      productsCartArray && (
                        <p>
                          Totals:
                          {` $${formatNumber(data.me.shoppingCart.totalProductsCost)}`}
                          {hasShippingFee && `(+ ${formatNumber(shippingFee)} SHIPPING)`}
                        </p>
                      )
                    }
                  </div>
                  <div className="ShoppingCart--modal--actions">
                    <button
                      className="cta-modal"
                      type="button"
                      onClick={() => this.setState({ showModal: !showModal })}
                    >
                      Continue Browsing
                    </button>
                    <Link
                      className="cta-modal"
                      to={
                        isLoggedIn()
                          ? urlPatterns.CHECKOUT
                          : { pathname: urlPatterns.SIGN_UP, state: { isShoppingCart: true } }
                      }
                      onClick={() => this.setState({ showModal: !showModal })}
                    >
                      Confirm and Proceed
                    </Link>
                  </div>
                </div>
                <button type="button" style={closeStyle} onClick={() => this.setState({ showModal: false })}>
                  X
                </button>
              </Modal>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ShoppingCart;
