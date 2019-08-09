import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  compose,
  graphql,
  Mutation,
  Query,
} from 'react-apollo';

import { GET_AUTH, SET_MEMBER_AUTH } from '../../graphql/resolvers/auth';
import { ADD_SHOPPING_CART_ITEM, UPDATE_SHOPPING_CART_ITEM } from '../../graphql/mutations';
import { GET_MEMBER, GET_SHOPPING_CART } from '../../graphql/queries';
import {
  AccountDetailsForm,
  ContactPreferencesForm,
  FreeShipping,
  ShippingAddressForm,
  SubscriptionBillingDay,
  SubscriptionStatus,
  PaymentMethod,
  WineBlacklist,
  WinePreference,
} from '../../components';
import { identifyUser } from '../../helpers/Analytics';
import { FETCH_POLICY_CACHE_ONLY } from '../../helpers/constants';
import { shoppingCartLocalStorage } from '../../helpers/tools';

import './MyAccount.scss';

/**
 * Renders MyAccount component
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class MyAccount extends Component {
  static propTypes = {
    setMemberAuth: PropTypes.func.isRequired,
    authQuery: PropTypes.shape({}).isRequired,
  };

  componentDidMount() { }

  /**
   * Updates shopping cart and memberId from local storage.
   * @param {Function} addShoppingCart - GraphQL mutation to add to item to shopping cart
   * @param {Function} updateShoppingCart - GraphQL mutation to update item in shopping cart
   * @param {number} memberId - id from member
   * @param {Array} shoppingCartSet - shopping cart items
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * */
  handleUpdatesOnLogin = async (
    addShoppingCart, updateShoppingCart, memberId, shoppingCartSet, firstName, lastName, email,
  ) => {
    const { setMemberAuth } = this.props;

    // Sets values related to member's Auth
    setMemberAuth({
      variables: {
        memberId,
        token: localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE),
      },
    })
      .catch(error => {
        console.error(error);
      });

    const shoppingCart = shoppingCartLocalStorage();

    const analyticsIdentityData = {
      email,
      id: memberId,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      created: new Date().getDate(),
    };
    identifyUser(memberId, analyticsIdentityData);

    // Checks if user has added items to local storage shopping cart
    if (shoppingCart) {

      const shoppingCartItemsId = shoppingCartSet && shoppingCartSet.length && shoppingCartSet
        .map(item => item.product.id);

      // Creates shopping cart in database with local storage item
      shoppingCart.items.length
      && shoppingCart.items.forEach(item => {

        // Skips if the wine is already on the DB shopping cart
        if (
          shoppingCartItemsId && shoppingCartItemsId.length && shoppingCartItemsId.includes(item.product.id)
        ) {
          updateShoppingCart({
            variables:
              {
                input:
                  {
                    memberId,
                    productId: item.product.id,
                    quantity: item.quantity,
                  },
              },
          }).then(

            //  Deletes shopping cart from local storage
            window.localStorage.removeItem('shoppingCart')
          );
        } else {
          addShoppingCart({
            variables:
              {
                input:
                  {
                    memberId,
                    productId: item.product.id,
                    quantity: item.quantity,
                  },
              },
          }).then(

            //  Deletes shopping cart from local storage
            window.localStorage.removeItem('shoppingCart')
          );
        }
      });
    }
  };

  render() {
    return (
      <div className="MyAccount">
        <Mutation mutation={UPDATE_SHOPPING_CART_ITEM} refetchQueries={() => [{ query: GET_SHOPPING_CART }]}>
          {(updateShoppingCart, { loading: loadingUpdateShoppingCart, error: errorUpdateShoppingCart }) => {
            if (loadingUpdateShoppingCart) return 'Loading...';
            if (errorUpdateShoppingCart) {
              console.log('Non-friendly error message', errorUpdateShoppingCart.message);
            }
            return (
              <Mutation
                mutation={ADD_SHOPPING_CART_ITEM}
                refetchQueries={() => [{ query: GET_SHOPPING_CART }]}
              >
                {(addShoppingCart, { loading: loadingAddShoppingCart, error: errorAddShoppingCart }) => {
                  if (loadingAddShoppingCart) return 'Loading...';
                  errorAddShoppingCart && console.log(
                    'Non-friendly error message', errorAddShoppingCart.message
                  );

                  return (
                    <Query query={GET_MEMBER} fetchPolicy="cache-and-network" partialRefetch>
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        if (data.me) {
                          this.handleUpdatesOnLogin(
                            addShoppingCart,
                            updateShoppingCart,
                            data.me.id,
                            data.me.shoppingCart && data.me.shoppingCart.shoppingcartitemSet,
                            data.me.firstName,
                            data.me.lastName,
                            data.me.email,
                          );
                          return (
                            <div className="MyAccount--container">
                              <h1 className="MyAccount--forms__title">My Account</h1>
                              <div className="MyAccount--forms__wine-preferences">
                                <WinePreference
                                  wineQuantity={data.me}
                                  memberId={data.me.id}
                                />
                                <WineBlacklist me={data.me} />
                              </div>
                              <div className="MyAccount--forms__payment-method">
                                <PaymentMethod me={data.me} />
                              </div>
                              <div className="MyAccount--forms__billing-day">
                                <SubscriptionBillingDay me={data.me} />
                              </div>
                              <div className="MyAccount--forms__subscription">
                                <SubscriptionStatus me={data.me} />
                              </div>
                              <div className="MyAccount--forms__account">
                                <AccountDetailsForm me={data.me} />
                              </div>
                              <div className="MyAccount--forms__shipping">
                                <ShippingAddressForm me={data.me} />
                                <FreeShipping navigateToCheckout />
                              </div>
                              <div className="MyAccount--forms__contact-preferences">
                                <ContactPreferencesForm
                                  contactPreference={data.me.contactpreferenceSet}
                                  memberId={data.me.id}
                                />
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div>
                            Ooops, this is embarrassing... Something went wrong, try to reload your page.
                          </div>
                        );
                      }}
                    </Query>
                  );
                }}
              </Mutation>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default compose(
  graphql(SET_MEMBER_AUTH, { name: 'setMemberAuth' }),
  graphql(
    GET_AUTH, {
      name: 'authQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY },
    }
  ),
)(MyAccount);

