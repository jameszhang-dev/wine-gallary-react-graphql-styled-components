import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { InputField, StarRating } from '../..';
import { GET_MEMBER } from '../../../graphql/queries';
import { GET_AUTH } from '../../../graphql/resolvers/auth';
import { UPDATE_WINE_RATING } from '../../../graphql/mutations';
import {
  DEFAULT_BOTTLE_URL,
  FETCH_POLICY_NETWORK_ONLY,
  FETCH_POLICY_CACHE_ONLY,
} from '../../../helpers/constants';

import './WineRatingItem.scss';

/**
 * Renders WineRatingItem component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineRatingItem extends Component {
  static propTypes = {
    orderItem: PropTypes.shape({}).isRequired,
    authQuery: PropTypes.shape({}).isRequired,
    updateWineRating: PropTypes.func.isRequired,
  };

  state = {
    note: null,
    showNotes: false,
  };

  componentDidMount() {
    const { orderItem } = this.props;

    // Populates notes as soon as it is mounted
    if (orderItem.product.wine.memberWineRatings.length) {
      this.setState({
        note: orderItem.product.wine.memberWineRatings[0].note,
      });
    }
  }

  /**
   * Handles changes in the notes
   * @param name
   * @param value
   * */
  handleChangeNote = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  /**
   * Handles open and closes of the notes, also updates note once closes
   * */
  handleOpenCloseNote = () => {
    const { showNotes, note } = this.state;

    // Saves note on close
    if (showNotes) {
      this.handleUpdateWineRating('note', note);
    }

    // Closes notes
    this.setState({
      showNotes: !showNotes,
    });
  };

  /**
   * Handles the update of all the fields in wine ratings
   * @param {string} name
   * @param {string|number|boolean} value
   * */
  handleUpdateWineRating = (name, value) => {
    const { orderItem, authQuery, updateWineRating } = this.props;
    const { memberId } = authQuery.auth;
    const wineId = orderItem.product.wine.id;

    updateWineRating({
      refetchQueries: () => [{ query: GET_MEMBER, fetchPolicy: FETCH_POLICY_NETWORK_ONLY }],
      variables: {
        input: {
          memberId,
          wineId,
          [name]: value,
        },
      },
    });
  };

  /**
   * Renders thumbs up and down for wine ratings
   * @param {boolean} memberWineRatings
   * @return {React.Component}
   * */
  renderThumbsUpAndDown = memberWineRatings => {
    const liked = memberWineRatings.length && memberWineRatings[0].liked;
    return (
      <div>
        <button
          type="button"
          className={liked ? 'like' : ''}
          onClick={() => this.handleUpdateWineRating('liked', true)}
        >
          Like
        </button>
        <button
          type="button"
          className={!liked ? 'not-like' : ''}
          onClick={() => this.handleUpdateWineRating('liked', false)}
        >
          Do not like
        </button>
      </div>
    );
  };

  render() {
    const { orderItem } = this.props;
    const { showNotes, note } = this.state;

    // Sets wine photo
    const photoUrl = orderItem.product.productPhotos.length
      ? orderItem.product.productPhotos[0].photoLarge
      : DEFAULT_BOTTLE_URL;

    return (
      <div className="WineRatingItem">
        <img src={photoUrl} alt="" />
        <div>{orderItem.product.name}</div>
        <div>{orderItem.product.wine.year}</div>
        <div>{orderItem.product.wine.country.name}</div>
        <div>{orderItem.product.wine.wineRegion.name}</div>
        <div>
          {this.renderThumbsUpAndDown(orderItem.product.wine.memberWineRatings)}
        </div>
        {
          showNotes && (
            <div>
              <div>
                <StarRating
                  score={
                    orderItem.product.wine.memberWineRatings.length
                      ? orderItem.product.wine.memberWineRatings[0].score
                      : 0
                  }
                  onClick={newScore => this.handleUpdateWineRating('score', newScore)}
                />

              </div>
              <InputField
                label="Notes"
                name="note"
                id="note"
                value={note}
                onChange={this.handleChangeNote}
              />
            </div>
          )
        }
        <button type="button" onClick={this.handleOpenCloseNote}>
          {showNotes ? 'Update Ratings and Notes' : 'Edit my notes and ratings'}
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(GET_AUTH, { name: 'authQuery', options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY } }),
  graphql(UPDATE_WINE_RATING, { name: 'updateWineRating' }),
)(WineRatingItem);
