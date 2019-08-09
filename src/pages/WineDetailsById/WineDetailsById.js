import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';
import { GET_WINE_SLUG } from '../../graphql/queries';
import urlPatterns from '../../urls';

/**
 * Renders WineDetailsById component accessible by wine ID that redirects user to the WINE_DETAILS page
 * which is accessible by slug.
 * */
class WineDetailsById extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    wineSlugQuery: PropTypes.shape({}).isRequired,
  };

  componentDidUpdate() {
    const { wineSlugQuery, history } = this.props;

    if (wineSlugQuery.wine && wineSlugQuery.wine.product.slug) {
      history.push(urlPatterns.WINE_DETAILS(wineSlugQuery.wine.product.slug));
    }
  }

  render() {
    const { wineSlugQuery } = this.props;
    if (wineSlugQuery.loading) return <div>Loading...</div>;
    return null;
  }
}

export default compose(
  graphql(GET_WINE_SLUG, {
    name: 'wineSlugQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
)(WineDetailsById);
