import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  compose,
  graphql,
  Mutation,
  Query,
} from 'react-apollo';

import {
  GET_MEMBER,
  GET_SHOPPING_CART,
  GET_SPECIAL_PACK_DETAILS,
} from '../../graphql/queries';
import { ADD_SPECIAL_PACK_INTEREST, ADD_SHOPPING_CART_ITEM } from '../../graphql/mutations';
import { GET_AUTH } from '../../graphql/resolvers/auth';
import { PRODUCT_TYPE_IDS, FETCH_POLICY_CACHE_ONLY } from '../../helpers/constants';
import { saveCartItemToLocalStorage } from '../../helpers/tools';
import urlPatterns from '../../urls';
import { isLoggedIn } from '../../helpers/auth';

import './SpecialPackDetails.scss';

/**
 * Renders SpecialPackDetails component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SpecialPackDetails extends Component {
  static propTypes = {
    match: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({}).isRequired,
    authQuery: PropTypes.shape({}).isRequired,
  };

  state = {
    boxQuantities: {}, // stores {productId: quantity}
  };

  buySection = React.createRef();

  /**
   * Adds effect to scroll to the bottom of the page where the "buy" button is located
   * */
  handleScrollToBuySection = () => {
    window.scrollTo({ top: this.buySection.current.offsetTop, behavior: 'smooth' });
  };

  /**
   * Sends request to GraphQL to register interest from the user in the special pack
   * If user is not logged in, it will be redirected to the login page
   * @param {Object} specialPack
   * @param {Function} registerInterestMutation
   * @return {Promise<void>}
   * */
  handleAddSpecialPackInterest = async (specialPack, registerInterestMutation) => {
    const { history, authQuery } = this.props;

    if (isLoggedIn()) {
      const memberId = authQuery.auth && authQuery.auth.memberId;
      await registerInterestMutation({
        variables: {
          input: {
            specialPackEditionId: specialPack.id,
            memberId,
          },
        },
      });
    } else {
      history.push(urlPatterns.LOGIN);
    }
  };

  /**
   * Sets quantity of special boxes the user wants to purchase
   * @param {Event} e
   * @param {object} specialPackOption
   * */
  handleQuantityChange = (e, specialPackOption) => {
    const quantity = parseInt(e.target.value, 10);
    const { boxQuantities } = this.state;
    this.setState({ boxQuantities: { ...boxQuantities, [specialPackOption.product.id]: quantity } });
  };

  /**
   * Adds selected Special Packs to the Shopping Cart.
   *
   * @param {Function} addShoppingCartItem - GraphQL mutation to add item to shopping cart
   * @param {Array} specialPackOptions - array of Special Pack Options required to retrieve their data
   * */
  handleAddSpecialPacksToShoppingCart = (addShoppingCartItem, specialPackOptions) => {
    const { boxQuantities } = this.state;
    const { authQuery } = this.props;

    const memberId = authQuery.auth && authQuery.auth.memberId;

    // TODO: [DEV-285] send 1 request for multiple Products
    let promises = []; // promises are required as multiple Special Packs can be added at once

    if (isLoggedIn()) {
      promises = Object.entries(boxQuantities).map(([productId, quantity]) => (
        addShoppingCartItem({
          variables: {
            input: {
              memberId,
              productId,
              quantity,
            },
          },
        })
      ));
    } else {

      // Maps special pack options to an object to retrieve name and sellingPrice per product later
      const specialPackOptionsAsObject = {};
      specialPackOptions.forEach(specialPackOption => {
        specialPackOptionsAsObject[specialPackOption.product.id] = {
          name: specialPackOption.displayName,
          sellingPrice: specialPackOption.product.sellingPrice,
          productType: specialPackOption.product.productType.id,
        };
      });

      // Saves special pack item to shopping cart in browser session in case user is not logged in
      promises = Object.entries(boxQuantities).map(([productId, quantity]) => {
        const shoppingCartItem = {
          quantity,
          product: {
            id: productId,
            name: specialPackOptionsAsObject[productId].name,
            sellingPrice: specialPackOptionsAsObject[productId].sellingPrice,
            productType: {
              id: PRODUCT_TYPE_IDS.DB_ID_PRODUCT_TYPE_SPECIAL_PACK,
            },
          },
        };
        return saveCartItemToLocalStorage(shoppingCartItem, true, false, false);
      });
    }

    Promise.all(promises).then(() => {
      // TODO DEV-203: bind shopping cart counter to apollo-link-state variable
      window.shoppingCartRefresh();
      window.showShoppingCart();
    });
  };

  /**
   * Renders options for select input field from the quantity user wants to purchase.
   * */
  renderOptions = specialPackOption => {
    const defaultOption = (
      <option value={0} key={specialPackOption.product.id}>
        {'Qty'}
      </option>
    );
    const options = [defaultOption];
    for (let index = 1; index < 25; index++) {
      options.push(
        <option value={index} key={`${index}-${specialPackOption.product.id}`}>
          {`${index} ${index === 1 ? ' box' : ' boxes'}`}
        </option>
      );
    }
    return options;
  };

  render() {
    const { match } = this.props;
    const { slug } = match.params;

    return (
      <div className="SpecialPackDetails">
        <Query query={GET_SPECIAL_PACK_DETAILS} variables={{ slug }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) console.error(`Shopping cart error! ${error.message}`);

            const specialPackEdition = data && data.specialPackEdition;
            if (!specialPackEdition) return 'Sorry this pack is not available anymore...';

            return (
              <div className="SpecialPackDetails--container">
                <div className="SpecialPackDetails--container__inner">

                  {/* HERO BANNER */}
                  <section className={`SpecialPackDetails--hero-banner ${specialPackEdition.heroTopTheme}`}>
                    <img
                      className="SpecialPackDetails--hero-banner__image"
                      src={specialPackEdition.heroTopImageLargeUrl}
                      alt={specialPackEdition.section1Title}
                    />
                    <div className="SpecialPackDetails--hero-banner__title">
                      <h1>{specialPackEdition.seoTitle}</h1>
                      <p>
                        {specialPackEdition.seoDescription}
                      </p>
                      <button type="button" onClick={this.handleScrollToBuySection}>
                        {specialPackEdition.isAvailable ? 'Order now' : 'Register your interest'}
                      </button>
                    </div>
                  </section>

                  {/* SECTION 1 */}
                  <section className="SpecialPackDetails--content">
                    <div className="SpecialPackDetails--content__title">
                      <h2>{specialPackEdition.section1Title}</h2>
                      <p>{specialPackEdition.section1Text}</p>
                    </div>
                    <div className="SpecialPackDetails--content__image">
                      <img
                        className="SpecialPackDetails--content__image"
                        src={specialPackEdition.section1ImageLargeUrl}
                        alt={specialPackEdition.section1Title}
                      />
                    </div>
                  </section>

                  {/* SECTION 2 */}
                  <section className="SpecialPackDetails--content">
                    <div className="SpecialPackDetails--content__title">
                      <h2>{specialPackEdition.section2Title}</h2>
                      <p>{specialPackEdition.section2Text}</p>
                    </div>
                    <div className="SpecialPackDetails--content__image">
                      <img
                        className="SpecialPackDetails--content__image"
                        src={specialPackEdition.section2ImageLargeUrl}
                        alt={specialPackEdition.section2Title}
                      />
                    </div>
                  </section>

                  {/* SECTION 3 */}
                  <section className="SpecialPackDetails--content">
                    <div className="SpecialPackDetails--content__title">
                      <h2>{specialPackEdition.section3Title}</h2>
                      <p>{specialPackEdition.section3Text}</p>
                    </div>
                    <div className="SpecialPackDetails--content__image">
                      <img
                        src={specialPackEdition.section3ImageLargeUrl}
                        alt={specialPackEdition.section3Title}
                      />
                    </div>
                  </section>

                  {/* SECTION BOTTOM */}
                  <section className="SpecialPackDetails--content bottom" ref={this.buySection}>
                    <div className="SpecialPackDetails--content__title">
                      <h2>{specialPackEdition.heroBottomTitle}</h2>
                      <p>{specialPackEdition.heroBottomSubTitle}</p>
                      {
                        specialPackEdition.isAvailable && specialPackEdition.specialpackoptionSet.map(
                          specialPackOption => (
                            <div key={specialPackOption.id}>
                              <select
                                name="select-boxes"
                                id="select-boxes"
                                onChange={e => this.handleQuantityChange(e, specialPackOption)}
                              >
                                {this.renderOptions(specialPackOption)}
                              </select>
                              <p className="SpecialPackDetails--content__option-name">
                                {specialPackOption.displayName}
                              </p>
                            </div>
                          )
                        )
                      }
                      {

                        // Renders button to add special pack to shopping cart or to register interest
                        specialPackEdition.isAvailable
                          ? (
                            <Mutation
                              mutation={ADD_SHOPPING_CART_ITEM}
                              refetchQueries={() => [{ query: GET_MEMBER }, { query: GET_SHOPPING_CART }]}
                            >
                              {addShoppingCartItem => (
                                <button
                                  type="button"
                                  onClick={
                                    () => this.handleAddSpecialPacksToShoppingCart(
                                      addShoppingCartItem, specialPackEdition.specialpackoptionSet
                                    )
                                  }
                                >
                                  Order Now
                                </button>
                              )}
                            </Mutation>
                          )
                          : (
                            <Mutation
                              mutation={ADD_SPECIAL_PACK_INTEREST}
                            >
                              {registerInterestMutation => (
                                <button
                                  type="button"
                                  onClick={() => this.handleAddSpecialPackInterest(
                                    specialPackEdition, registerInterestMutation
                                  )}
                                >
                                  Register Interest
                                </button>
                              )}
                            </Mutation>
                          )
                      }
                    </div>
                    <div className="SpecialPackDetails--content__image">
                      <img
                        src={specialPackEdition.heroBottomImageLargeUrl}
                        alt={specialPackEdition.heroBottomSubTitle}
                      />
                    </div>
                  </section>
                </div>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default compose(
  graphql(GET_AUTH, { name: 'authQuery', options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY } }),
)(SpecialPackDetails);
