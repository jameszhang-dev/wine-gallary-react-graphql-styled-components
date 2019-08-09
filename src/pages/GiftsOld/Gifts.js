import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { GiftSignUpForm, GiftMemberForm } from '../../components';
import { ADD_SHOPPING_CART_ITEM, SIGN_UP } from '../../graphql/mutations';
import {
  GET_ALL_GIFT_DELIVERIES,
  GET_ALL_GIFT_PLANS,
  GET_ALL_GIFT_TEMPLATES,
  GET_MEMBER,
  GET_GIFT_PLAN,
} from '../../graphql/queries';
import { GET_AUTH } from '../../graphql/resolvers/auth';
import {
  GET_GIFT_FLOW_INFO,
  GET_GIFT_FLOW_SIGN_UP_FORM_INFO,
  SET_GIFT_FLOW_INFO,
} from '../../graphql/resolvers/gift';
import { executeSignUpRequest } from '../../helpers/auth';
import {
  FETCH_POLICY_CACHE_AND_NETWORK,
  FETCH_POLICY_CACHE_ONLY,
  FETCH_POLICY_NETWORK_ONLY,
} from '../../helpers/constants';
import urlPatterns from '../../urls';

import './Gifts.scss';

const JOURNEY_LENGTH_BUTTON = [
  { months: 1, alwaysVisible: true },
  { months: 2, alwaysVisible: false },
  { months: 3, alwaysVisible: true },
  { months: 4, alwaysVisible: false },
  { months: 5, alwaysVisible: false },
  { months: 6, alwaysVisible: true },
  { months: 7, alwaysVisible: false },
  { months: 8, alwaysVisible: false },
  { months: 9, alwaysVisible: false },
  { months: 10, alwaysVisible: false },
  { months: 11, alwaysVisible: false },
  { months: 12, alwaysVisible: true },
];

const PRICE_POINT_BUTTONS = [
  { id: 1, price: 15, description: 'for 3 bottles of entry level wines' },
  { id: 2, price: 23, description: 'for 3 bottles of wine lover wines' },
  { id: 3, price: 38, description: 'for 3 bottles of budding Somm wines' },
];

const DEFAULT_WINE_PRICE_POINT = 2;
const DEFAULT_MONTHS = 3;

const DB_ID_GIFT_DELIVERY_SHIP_BOX = 1;
const DB_ID_GIFT_DELIVERY_SHIP_LETTER = 2;
const DB_ID_GIFT_DELIVERY_SEND_EMAIL = 3;
const DB_ID_GIFT_DELIVERY_DIY = 4;

/**
 * Renders Gifts component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Gifts extends Component {
  static propTypes = {
    setGiftFlowInfo: PropTypes.func.isRequired,
    addShoppingCartItem: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
    meQuery: PropTypes.shape({}).isRequired,
    authQuery: PropTypes.shape({}).isRequired,
    giftFlowQuery: PropTypes.shape({}).isRequired,
    allGiftDeliveriesQuery: PropTypes.shape({}).isRequired,
    allGiftPlansQuery: PropTypes.shape({}).isRequired,
    allGiftTemplatesQuery: PropTypes.shape({}).isRequired,
    giftFlowSignUpFormInfoQuery: PropTypes.shape({}).isRequired,
    giftPlanQuery: PropTypes.shape({}).isRequired,
  };

  state = {
    months: {
      hideJourneyLengthButtons: true,
    },
  };

  /**
   * Cleans up property related to delivery type, as it has different steps depending on the options chosen.
   * It makes sure redBottles/whiteBottles are null, in case the user returns a step and choose another type
   * of delivery.
   *
   * @param {string} property name of the field being updated
   * @return {Promise<void>}
   * */
  handleCleaningGiftDeliveryType = async property => {
    const { giftFlowQuery } = this.props;

    if (property === 'giftDeliveryId') {

      switch (giftFlowQuery.giftFlow.giftDeliveryId) {

        case DB_ID_GIFT_DELIVERY_SHIP_BOX:
          await this.handleGiftFlowUpdate('redBottles', null)
            .then(() => this.handleGiftFlowUpdate('whiteBottles', null));
          break;

        case DB_ID_GIFT_DELIVERY_SHIP_LETTER:
          await this.handleGiftFlowUpdate('step', giftFlowQuery.giftFlow.step + 1);
          break;

        case DB_ID_GIFT_DELIVERY_DIY:
        case DB_ID_GIFT_DELIVERY_SEND_EMAIL:
          await this.handleGiftFlowUpdate('giftTemplateId', null);
          break;

        default:
          break;
      }
    }
  };

  /**
   * Updates global state properties related to giftFlowQuery as it is changed.
   *
   * @param {string} property name of the field being updated
   * @param {*} value
   * @return {Promise<void>}
   * */
  handleGiftFlowUpdate = async (property, value) => {
    const { setGiftFlowInfo, giftFlowQuery } = this.props;
    await setGiftFlowInfo({
      variables: {
        ...giftFlowQuery.giftFlow,
        [property]: value,
      },
      refetchQueries: () => [{ // Re-fetches gift plan query on every change of gift flow to update productId
        query: GET_GIFT_PLAN,
        variables: {
          winePricePointId: giftFlowQuery.giftFlow.winePricePointId || DEFAULT_WINE_PRICE_POINT,
          months: giftFlowQuery.giftFlow.months || DEFAULT_MONTHS,
        },
        options: {
          fetchPolicy: FETCH_POLICY_NETWORK_ONLY,
        },
      }],
    });
  };

  /**
   * Submits information from global state to shopping cart and redirects the user to checkout page.
   * Happens after sign up and login are made.
   * @param {Object} member
   * @return {Promise<void>}
   * */
  handleSubmitNewMemberInfo = async (member = null) => {
    const {
      addShoppingCartItem,
      giftFlowQuery,
      authQuery,
      giftPlanQuery,
    } = this.props;
    const {
      __typename,
      step,
      months,
      winePricePointId,
      toMemberId,
      ...restGiftFlow
    } = giftFlowQuery.giftFlow;

    const memberId = authQuery.auth.memberId || member.data.signUp.id;
    const productId = giftPlanQuery.giftPlan.product.id;

    await addShoppingCartItem({
      variables: {
        input: {
          memberId,
          productId,
          quantity: 1,
          extraInfo: {
            ...restGiftFlow,
            fromMemberId: memberId,
            toMemberShippingAddressId: 13674, // this information will be populated on checkout when backend
          },
        },
      },
    }).then(response => {
      if (!response.data.addShoppingCartItem.errors) {
        window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.CHECKOUT}`;
      }
    }).catch(error => {
      if (error) {
        console.error('Gift purchase flow', error);
      }
    });
  };

  /**
   * Renders buttons for the options through the gift flow.
   * @param {string} property
   * @param {*} value
   * @param {number} nextStep
   * @param {string} description
   * @param {string} style
   * @return {React.Component}
   * */
  renderButtonOptions = (property, value, nextStep, description, style = 'button-large') => (
    <button
      key={value}
      type="button"
      onClick={() => {
        this.handleCleaningGiftDeliveryType(property)
          .then(() => this.handleGiftFlowUpdate(property, value)
            .then(() => this.handleGiftFlowUpdate('step', nextStep)));
      }}
      className={style}
    >
      {description}
    </button>
  );

  /**
   * Renders next and prev buttons to navigate back forth on the gift flow.
   * @param {string|*} prevText
   * @param {string|*} nextText
   * @param {number|*} prevStep
   * @param {number|*} nextStep
   * @param {string} property
   * @return {React.Component}
   * */
  renderNextAndPrevButtons = (
    {
      prevText = null, nextText = null, prevStep = null, nextStep = null, property,
    }
  ) => (
    <div>
      <button
        type="button"
        onClick={() => this.handleGiftFlowUpdate('step', prevStep)}
        className="link-button"
        disabled={!prevStep}
      >
        {prevText || 'Previous'}
      </button>

      {
        nextStep && (
          <button
            type="button"
            onClick={() => this.handleGiftFlowUpdate('step', nextStep)}
            disabled={!property}
            className="link-button"
          >
            {nextText || 'Next'}
          </button>
        )
      }
    </div>
  );

  render() {
    const { months } = this.state;
    const {
      giftFlowQuery,
      allGiftDeliveriesQuery,
      authQuery,
      allGiftTemplatesQuery,
      meQuery,
      giftFlowSignUpFormInfoQuery,
      addShoppingCartItem,
      signUp,
    } = this.props;

    if (giftFlowQuery.loading || !giftFlowQuery.giftFlow) return <div>Loading...</div>;

    return (
      <div className="Gifts">
        <div className="Gifts--container">
          <h1>Gifts</h1>

          {/**
           * Screen 1:
           * Step 0:
           * We ask for “Length of gift journey”.
           * We list 1, 3, 6 or 12 by default (if they click to view more then show 1 to 12).
           */}
          {
            giftFlowQuery.giftFlow.step === 1 && (
              <section className="Gifts--sections">
                <div className="Gifts--sections--gift-details">
                  <div className="Gifts--sections--gift-details__cta-buttons">
                    {
                      JOURNEY_LENGTH_BUTTON.map(item => {

                        const style = item.alwaysVisible
                          ? 'button-large'
                          : `button-large ${months.hideJourneyLengthButtons && 'hide'}`;
                        const description = `${item.months} months`;

                        return this.renderButtonOptions(
                          'months', item.months, 2, description, style,
                        );
                      })
                    }
                  </div>
                  <button
                    type="button"
                    onClick={() => this.setState({
                      months: {
                        hideJourneyLengthButtons: !months.hideJourneyLengthButtons,
                      },
                    })}
                  >
                    {months.hideJourneyLengthButtons ? 'Show more options' : 'Show fewer options'}
                  </button>
                </div>
                {
                  this.renderNextAndPrevButtons({
                    nextStep: 2,
                    property: giftFlowQuery.giftFlow.months,
                  })
                }
              </section>
            )
          }

          {/**
           * Screen 2:
           * Step 1:
           * We ask the “Monthly spend”.
           * We list the enabled WinePricePoint, but instead of showing just the price per bottle, we show
           * the total for 3 bottles.
           *
           * $55 for 3 bottles of entry level wines
           * $78 for 3 bottles of wine lover wines
           * $123 for 3 bottles of budding Somm wines
           * With this and the previous info, we now can identify and save GiftPlan
           */}
          {
            giftFlowQuery.giftFlow.step === 2 && (
              <section className="Gifts--sections">
                <div className="Gifts--sections--gift-details">
                  <div className="Gifts--sections--price-points__cta-buttons">
                    {
                      PRICE_POINT_BUTTONS.map(item => {
                        const description = `$${item.price * 3 + 9} ${item.description}`;
                        return (
                          this.renderButtonOptions('winePricePointId', item.id, 3, description)
                        );
                      })
                    }
                  </div>
                </div>
                {
                  this.renderNextAndPrevButtons({
                    prevStep: 1,
                    nextStep: 3,
                    property: giftFlowQuery.giftFlow.winePricePointId,
                  })
                }
              </section>
            )
          }

          {/**
           * Screen 3:
           * Step 2:
           * we ask for GiftDelivery:
           * We list this from the DB.
           *
           * DB_ID_GIFT_DELIVERY_SHIP_BOX = 1
           * DB_ID_GIFT_DELIVERY_SHIP_LETTER = 2
           * DB_ID_GIFT_DELIVERY_SEND_EMAIL = 3
           * DB_ID_GIFT_DELIVERY_DIY = 4
           */}
          {
            giftFlowQuery.giftFlow.step === 3 && (
              <section className="Gifts--sections">
                {
                  allGiftDeliveriesQuery.loading
                    ? (
                      <div className="Gifts--sections--gift-details">
                        <div>Loading...</div>
                      </div>
                    ) : (
                      <div className="Gifts--sections--gift-details">
                        {
                          allGiftDeliveriesQuery.allGiftDeliveries
                          && allGiftDeliveriesQuery.allGiftDeliveries.map(delivery => (
                            this.renderButtonOptions(
                              'giftDeliveryId', delivery.id, 4, delivery.name,
                            )
                          ))
                        }
                      </div>
                    )
                }
                {
                  this.renderNextAndPrevButtons({
                    prevStep: 2,
                    nextStep: 4,
                    property: giftFlowQuery.giftFlow.giftDeliveryId,
                  })
                }
              </section>
            )
          }

          {/**
           * Screen 3.1:
           * Step 3:
           * If DB_ID_GIFT_DELIVERY_SHIP_BOX we ask for the colour of the bottles.
           * We should populate the ShoppingCart.extra_info with:
           * red_bottles, white_bottles, sparkling_bottles and rose_bottles.
           * For now, you can just list these buttons All reds, All Whites, Mixed.
           */}
          {
            giftFlowQuery.giftFlow.step === 4
            && giftFlowQuery.giftFlow.giftDeliveryId === DB_ID_GIFT_DELIVERY_SHIP_BOX
            && (
              <section className="Gifts--sections">
                <div className="Gifts--sections--gift-details">
                  <div className="Gifts--sections--price-points__cta-buttons">
                    <button
                      type="button"
                      onClick={() => {
                        this.handleGiftFlowUpdate('redBottles', 3)
                          .then(() => this.handleGiftFlowUpdate('whiteBottles', null))
                          .then(() => this.handleGiftFlowUpdate('step', 5));
                      }}
                      className="button-large"
                    >
                      All reds
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        this.handleGiftFlowUpdate('whiteBottles', 3)
                          .then(() => this.handleGiftFlowUpdate('redBottles', null))
                          .then(() => this.handleGiftFlowUpdate('step', 5));
                      }}
                      className="button-large"
                    >
                      All Whites
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        this.handleGiftFlowUpdate('whiteBottles', 1)
                          .then(() => this.handleGiftFlowUpdate('redBottles', 2))
                          .then(() => this.handleGiftFlowUpdate('step', 5));
                      }}
                      className="button-large"
                    >
                      Mixed Bottles
                    </button>
                  </div>
                </div>
                {
                  this.renderNextAndPrevButtons({
                    prevStep: 3,
                    nextStep: 5,
                    property: giftFlowQuery.giftFlow.giftDeliveryId,
                  })
                }
              </section>
            )
          }

          {/**
           * Screen 3.2:
           * Step 3:
           * If DB_ID_GIFT_DELIVERY_SEND_EMAIL or DB_ID_GIFT_DELIVERY_DIY we ask for the email template
           * GiftTemplate.
           */}
          {
            giftFlowQuery.giftFlow.step === 4
            && (
              giftFlowQuery.giftFlow.giftDeliveryId === DB_ID_GIFT_DELIVERY_SEND_EMAIL
              || giftFlowQuery.giftFlow.giftDeliveryId === DB_ID_GIFT_DELIVERY_DIY
            )
            && (
              <section className="Gifts--sections">
                <div className="Gifts--sections--gift-details">
                  <div className="Gifts--sections--price-points__cta-buttons">
                    {
                      allGiftTemplatesQuery && allGiftTemplatesQuery.allGiftTemplates.map(
                        template => (
                          this.renderButtonOptions(
                            'giftTemplateId', template.id, 5, template.name
                          )
                        )
                      )
                    }
                  </div>
                </div>
                {
                  this.renderNextAndPrevButtons({
                    prevStep: 3,
                    nextStep: 5,
                    property: giftFlowQuery.giftFlow.giftTemplateId,
                  })
                }
              </section>
            )
          }

          {/**
           * Screen 4:
           * We need to identify the from_member and to_member for the Gift. The from_member should be a
           * regular sign-up form (if user is not logged-in). The to_member form for now will just save the
           * data to the shopping cart extra data as to_member_email, etc.
           * */}
          {
            (
              giftFlowQuery.giftFlow.step === 5
              || (
                giftFlowQuery.giftFlow.giftDeliveryId === DB_ID_GIFT_DELIVERY_SHIP_LETTER
                && (giftFlowQuery.giftFlow.step === 5 || giftFlowQuery.giftFlow.step === 4)
              )
            ) && (
              <section className="Gifts--sections">
                <div className="Gifts--sections--members-details">
                  <div className="Gifts--sections--members-details__form">

                    {/* Signs up user and trigger method to add gift to shopping cart */}
                    {!authQuery.auth.memberId
                      ? <GiftSignUpForm onSubmit={this.handleSubmitNewMemberInfo} />
                      : (
                        <div>
                          <h1>Your Details</h1>
                          {
                            meQuery.me && (
                              <div>
                                <div>{`${meQuery.me.firstName} ${meQuery.me.lastName}`}</div>
                                <div>{meQuery.me.email}</div>
                              </div>
                            )
                          }
                        </div>
                      )
                    }
                  </div>
                  <div className="Gifts--sections--members-details__form">
                    <GiftMemberForm />
                  </div>
                </div>
                {
                  authQuery.auth.memberId ? (
                    <button
                      type="button"
                      onClick={this.handleSubmitNewMemberInfo}
                      className="link-button"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={
                        () => executeSignUpRequest(
                          giftFlowSignUpFormInfoQuery.giftFlowSignUpForm, signUp, addShoppingCartItem
                        ).then(response => this.handleSubmitNewMemberInfo(response.member))
                      }
                      type="button"
                      className="link-button"
                    >
                      submit
                    </button>
                  )
                }
                {
                  this.renderNextAndPrevButtons({
                    prevStep: giftFlowQuery.giftFlow.giftDeliveryId === DB_ID_GIFT_DELIVERY_SHIP_LETTER
                      ? 3
                      : 4,
                    property: giftFlowQuery.giftFlow.giftTemplateId,
                  })
                }
              </section>
            )
          }

          {/**
           * Screen 5:
           * Checkout.
           * If DB_ID_GIFT_DELIVERY_SHIP_BOX or DB_ID_GIFT_DELIVERY_SHIP_LETTER we display the shipping
           * address form to to save and set as to_member_shipping_address_id.
           */}
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(GET_MEMBER, {
    name: 'meQuery',
    options: {
      partialRefetch: true,
    },
  }),
  graphql(ADD_SHOPPING_CART_ITEM, { name: 'addShoppingCart' }),
  graphql(SIGN_UP, { name: 'signUp' }),
  graphql(GET_ALL_GIFT_DELIVERIES, { name: 'allGiftDeliveriesQuery' }),
  graphql(GET_ALL_GIFT_PLANS, { name: 'allGiftPlansQuery' }),
  graphql(GET_ALL_GIFT_TEMPLATES, { name: 'allGiftTemplatesQuery' }),
  graphql(ADD_SHOPPING_CART_ITEM, { name: 'addShoppingCartItem' }),
  graphql(GET_GIFT_PLAN, {
    name: 'giftPlanQuery',
    options: props => ({
      fetchPolicy: FETCH_POLICY_CACHE_AND_NETWORK,
      variables: {
        winePricePointId: (
          (props.giftFlowQuery && props.giftFlowQuery.giftFlow.winePricePointId) || DEFAULT_WINE_PRICE_POINT
        ),
        months: (props.giftFlowQuery && props.giftFlowQuery.giftFlow.months) || DEFAULT_MONTHS,
      },
    }),
  }),
  graphql(SET_GIFT_FLOW_INFO, { name: 'setGiftFlowInfo' }),
  graphql(
    GET_AUTH, {
      name: 'authQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY },
    }
  ),
  graphql(
    GET_GIFT_FLOW_SIGN_UP_FORM_INFO, {
      name: 'giftFlowSignUpFormInfoQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY },
    }
  ),
  graphql(
    GET_GIFT_FLOW_INFO, {
      name: 'giftFlowQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY },
    }
  ),
)(Gifts);
