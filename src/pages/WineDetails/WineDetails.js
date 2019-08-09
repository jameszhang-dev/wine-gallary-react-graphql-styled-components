import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql, Query } from 'react-apollo';
import { GET_WINE } from '../../graphql/queries';
import { AddProductToShoppingCartButton, AddWineToList } from '../../components';
import { GET_AUTH } from '../../graphql/resolvers/auth';
import { DEFAULT_BOTTLE_URL, FETCH_POLICY_CACHE_ONLY } from '../../helpers/constants';
import { formatNumber } from '../../helpers/tools';

import './WineDetails.scss';

/**
 * Renders Wine details page.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class WineDetails extends Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
    authQuery: PropTypes.shape({}).isRequired,
  };

  static contextTypes = {};

  render() {
    const { match, authQuery } = this.props;
    const { slug } = match.params;
    const memberId = authQuery.auth && authQuery.auth.memberId;

    return (
      <div className="WineDetails">
        <Query query={GET_WINE} variables={{ slug, memberId }}>
          {({ loading, error, data }) => {
            const { wine } = data;
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            const coverPhotoUrl = `url(${wine.product.coverPhotoLarge})`;
            const memberLikelihood = wine.memberLikelihood
              ? `${((wine.memberLikelihood) * 100)}%`
              : 'Unknown';
            const photoUrl = wine.product.productPhotos.length
              ? wine.product.productPhotos[0].photoLarge
              : DEFAULT_BOTTLE_URL;

            return (
              <div>
                <div
                  className="WineDetails--cover"
                  style={{
                    background:
                      `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), ${coverPhotoUrl}`,
                  }}
                >
                  <h1>{wine.product.name}</h1>
                  <h2>{`${wine.wineRegion.name}-${wine.country.name}`}</h2>
                </div>

                {
                  wine.hasStock
                    ? <AddProductToShoppingCartButton product={wine.product} />
                    : <div>(no stock available)</div>
                }
                <AddWineToList wine={wine} />
                <div>
                  $
                  {formatNumber(wine.product.sellingPrice)}
                </div>

                <div>
                  <h4>
                    {`% match: ${memberLikelihood}`}
                  </h4>
                </div>

                <div className="WineDetails--details">
                  <img src={photoUrl} alt={wine.product.name} />
                  <div>
                    <p>
                      <b>Sweetness: </b>
                      {wine.wineSweetness.level}
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Body: </b>
                      {wine.wineBody.level}
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Tannin: </b>
                      {wine.wineTannin.level}
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Acidity: </b>
                      {wine.wineAcidity.level}
                    </p>
                  </div>

                  <div>
                    <h4>The wine&#39;s story:</h4>
                    <p>{wine.fullDescription}</p>
                  </div>

                  <div>
                    <h4>Sommelier notes:</h4>
                    <p>{wine.sommelierNotes}</p>
                  </div>

                  <div>
                    <h4>Food pairings:</h4>
                    <p>{wine.sommelierNotes}</p>
                  </div>

                  <div>
                    <h3>More Info: </h3>
                    <p>
                      <b>Cellar Period: </b>
                      {wine.wineCellarPeriod.name}
                      -
                      {wine.wineCellarPeriod.shortDescription}
                    </p>
                    <p>{wine.sommelierNotes}</p>
                    <p>
                      <b>Alcohol Level: </b>
                      {wine.alcoholPercentage}
                    </p>
                  </div>
                </div>

                <div>
                  <h3>Other info: </h3>
                  <p>
                    <b>Pairings: </b>
                    {wine.food.map(food => food.name).join(', ')}
                  </p>
                  <p>
                    <b>Production Methods: </b>
                    {wine.wineProductionMethods.map(method => method.name).join(', ')}
                  </p>
                  <p>
                    <b>Tastes: </b>
                    {wine.tastes.map(taste => taste.name).join(', ')}
                  </p>
                  <p>
                    <b>Seasons: </b>
                    {wine.seasons.map(season => season.name).join(', ')}
                  </p>
                  <p>
                    <b>Moods: </b>
                    {wine.moods.map(mood => mood.name).join(', ')}
                  </p>
                  <p>
                    <b>Oak: </b>
                    {wine.oakAged ? wine.wineBarrelType.name : 'No'}
                  </p>
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
)(WineDetails);
