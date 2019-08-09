import gql from 'graphql-tag';

/**
 * QUERIES
 * */

/**
 *  MUTATIONS
 * */
export const ADD_SHOPPING_CART_ITEM = gql`
  mutation AddShoppingCartItem($input: AddShoppingCartItemInput!){
    addShoppingCartItem(input: $input) {
      errors {
        field
        messages
      }
    }
  }
`;

export const DELETE_SHOPPING_CART_ITEM = gql`
  mutation DeleteShoppingCartItem($input: DeleteShoppingCartItemInput!){
    deleteShoppingCartItem (input: $input) {
      isDeleted
      errors {
        field
        messages
      }
    }
  }
`;

export const UPDATE_SHOPPING_CART_ITEM = gql`
  mutation UpdateShoppingCartItem($input: UpdateShoppingCartItemInput!){
    updateShoppingCartItem (input: $input) {
      shoppingCart {
        total
        totalShippingFee
        discount
        shoppingcartitemSet {
          id
          quantity
          product {
            id
            sellingPrice
          }
        }
      }
      errors {
        field
        messages
      }
    }
  }
`;

export const CHECKOUT = gql`
  mutation Checkout ($input: CheckoutInput!) {
    checkout (input: $input) {
      isSuccessful
      errors {
        field
        messages
      }
    }
  }
`;
