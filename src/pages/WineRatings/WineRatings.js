import React from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { GET_MEMBER } from '../../graphql/queries';
import { WineRatingList } from '../../components';

import './WineRatings.scss';

/**
 * Renders WineRatings component
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
const WineRatings = props => {
  const { meQuery } = props;

  if (meQuery.loading && !meQuery.error) return <div>Loading....</div>;
  if (meQuery.error) return <div>{JSON.stringify(meQuery.error)}</div>;
  return (
    <div className="WineRatings">
      {
        meQuery && meQuery.me
          ? (
            <div className="WineRatings--container">
              <h1 className="WineRatings--title">
                {`How's your wine journey going, ${meQuery.me.firstName} ?`}
              </h1>

              <WineRatingList data={meQuery.me.orderItemsWithRatings} />
            </div>
          ) : (
            <div>
              Ooops, this is embarrassing... Something went wrong, try to reload your page.
            </div>
          )
      }
    </div>
  );
};

WineRatings.propTypes = {
  meQuery: PropTypes.shape({}).isRequired,
};

export default compose(
  graphql(GET_MEMBER, { name: 'meQuery', options: { fetchPolicy: 'cache-and-network' } }),
)(WineRatings);

