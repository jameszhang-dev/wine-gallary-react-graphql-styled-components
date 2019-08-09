import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { compose, graphql, withApollo } from 'react-apollo';

import { DELETE_WINE_FROM_QUIZ_BOX } from '../../../graphql/mutations';
import { GET_MEMBER, GET_SHOPPING_CART } from '../../../graphql/queries';
import { GET_AUTH } from '../../../graphql/resolvers/auth';
import {
  DEFAULT_BOTTLE_URL,
  FETCH_POLICY_NETWORK_ONLY,
  FETCH_POLICY_CACHE_ONLY,
} from '../../../helpers/constants';
import urlPatterns from '../../../urls';

import './WineBox.scss';

/**
 * Renders WineBox component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineBox extends Component {
  static propTypes = {
    data: PropTypes.shape({}).isRequired,
    isEditing: PropTypes.bool,
    client: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({}).isRequired,
    authQuery: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    isEditing: false,
  };

  componentDidMount() {
    const { client, history } = this.props;

    // Prevents the user to land on wine box page without having answered the quiz
    client.query({
      query: GET_MEMBER,
      fetchPolicy: FETCH_POLICY_NETWORK_ONLY,
    }).then(response => {

      // Redirects user to quiz in case no subscription
      const { subscription } = response.data.me;
      if (subscription === null || subscription.subscriptionwineSet === null) {
        history.push(urlPatterns.QUIZ);
      }
    });
  }

  /**
   * Remove wine item from wine recommended list
   * @param wineId
   * */
  handleRemoveWineFromBox = wineId => {
    const { client, authQuery } = this.props;
    const memberId = authQuery.auth.memberId || null;
    const input = { wineId, memberId };

    client.mutate({
      mutation: DELETE_WINE_FROM_QUIZ_BOX,
      refetchQueries: () => [{ query: GET_SHOPPING_CART }],
      variables: { input },
    });
  };

  render() {
    const { data, isEditing, location } = this.props;
    const subscriptionWinesSorted = data.me.subscription && data.me.subscription.subscriptionwineSet
      .sort((a, b) => a.wine.id - b.wine.id);

    return (
      <div className="WineBox">
        {subscriptionWinesSorted
          ? subscriptionWinesSorted.map(subscriptionWine => {

            // Gets wine's photo URL or sets the default one if it doesn't exist
            const photoUrl = subscriptionWine.wine.product.productPhotos.length
              ? subscriptionWine.wine.product.productPhotos[0].photoLarge
              : DEFAULT_BOTTLE_URL;

            return (
              <div className="WineBox--recommendation-item" key={subscriptionWine.wine.product.id}>
                {
                  isEditing && (
                    <button
                      type="button"
                      className="icon"
                      onClick={() => this.handleRemoveWineFromBox(subscriptionWine.wine.id)}
                    >
                      X
                    </button>
                  )
                }
                <div className="WineBox--recommendation-item--name">
                  <p>
                    {subscriptionWine.wine.product.name}
                    {
                      subscriptionWine.quantity > 1 && (
                        <span className="counter">{subscriptionWine.quantity}</span>)
                    }
                  </p>
                </div>
                <p className="WineBox--recommendation-item--region">
                  {subscriptionWine.wine.wineRegion.name}
                </p>
                <img src={photoUrl} alt={subscriptionWine.wine.product.name} />
              </div>
            );
          })
          : (<div>Sorry it seems you do not have your subscription yet.</div>)
        }
        {
          subscriptionWinesSorted && (
            <div className="WineBox--action">
              We will cover your shipping, when you add 4 bottles or more per box.
              The amount of bottles in your box will set the total to be sent each month.
              You can always change this later.
              <br />
              {
                location && location.pathname === urlPatterns.WINES_BOX
                && <Link className="cta-link" to={urlPatterns.CHECKOUT}>Get My Wine Box</Link>
              }
            </div>
          )
        }
      </div>
    );
  }
}

export default compose(
  withApollo,
  withRouter,
  graphql(GET_AUTH, { name: 'authQuery', options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY } }),
)(WineBox);
