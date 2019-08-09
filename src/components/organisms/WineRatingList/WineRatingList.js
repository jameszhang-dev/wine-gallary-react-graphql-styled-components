import React from 'react';
import PropTypes from 'prop-types';

import { WineRatingItem } from '../..';

import './WineRatingList.scss';

/**
 * Renders WineRatingList component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
const WineRatingList = props => {
  const { data } = props;

  return (
    <div className="WineRatingList">
      <div className="WineRatingList--list">
        {
          data.map(orderItem => (
            <div className="WineRatingList--list--item" key={orderItem.id}>
              <WineRatingItem orderItem={orderItem} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

WineRatingList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default WineRatingList;
