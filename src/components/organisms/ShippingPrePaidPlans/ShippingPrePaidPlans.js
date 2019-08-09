import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import { AddProductToShoppingCartButton, DeleteProductFromShoppingCartButton } from '../..';
import { GET_ALL_SHIPPING_PRE_PAID_PLANS, GET_SHOPPING_CART } from '../../../graphql/queries';
import { FETCH_POLICY_CACHE_AND_NETWORK, FETCH_POLICY_CACHE_ONLY } from '../../../helpers/constants';

/**
 * Renders ShippingPrePaidPlans that allows Member to add/delete free-shipping plans
 * to/from the Shopping Cart.
 * */
const ShippingPrePaidPlans = props => {

  const {
    allShippingPrePaidPlansQuery, shoppingCartQuery, callbackOnAdd, callbackOnDelete,
  } = props;

  const productsInShoppingCart = shoppingCartQuery.me && shoppingCartQuery.me.shoppingCart
    && shoppingCartQuery.me.shoppingCart.shoppingcartitemSet.map(item => item.product.id);

  if (allShippingPrePaidPlansQuery.loading) { return <div>Loading...</div>; }

  return (
    <div className="ShippingPrePaidPlans">
      <h3>Yearly Shipping</h3>
      {allShippingPrePaidPlansQuery.allShippingPrePaidPlans.map(shippingPrePaidPlan => {
        const isAlreadyAdded = productsInShoppingCart
          && productsInShoppingCart.includes(shippingPrePaidPlan.product.id);

        if (isAlreadyAdded) {
          return (
            <DeleteProductFromShoppingCartButton
              key={shippingPrePaidPlan.id}
              product={shippingPrePaidPlan.product}
              label={`Cancel ${shippingPrePaidPlan.product.name}`}
              callbackOnDelete={callbackOnDelete}
            />
          );
        }
        return (
          <AddProductToShoppingCartButton
            key={shippingPrePaidPlan.id}
            product={shippingPrePaidPlan.product}
            label={shippingPrePaidPlan.product.name}
            showShoppingCart={false}
            callbackOnAdd={callbackOnAdd}
          />
        );
      })}
    </div>
  );
};

ShippingPrePaidPlans.propTypes = {
  allShippingPrePaidPlansQuery: PropTypes.shape().isRequired,
  shoppingCartQuery: PropTypes.shape().isRequired,
  callbackOnAdd: PropTypes.func.isRequired,
  callbackOnDelete: PropTypes.func.isRequired,
};

export default compose(
  graphql(
    GET_ALL_SHIPPING_PRE_PAID_PLANS,
    { name: 'allShippingPrePaidPlansQuery', options: { fetchPolicy: FETCH_POLICY_CACHE_AND_NETWORK } },
  ),
  graphql(
    GET_SHOPPING_CART,
    {
      name: 'shoppingCartQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY }, // No need to refetch Cart
    }
  ),
)(ShippingPrePaidPlans);
