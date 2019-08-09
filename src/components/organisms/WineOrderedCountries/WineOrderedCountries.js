import React from 'react';
import PropTypes from 'prop-types';

import { VectorMap } from 'react-jvectormap';

import './WineOrderedCountries.scss';

/**
 * Renders WineOrderedCountries component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
const WineOrderedCountries = props => {
  const { data } = props;
  const countries = (
    data.me && data.me.orderedWineCountries && data.me.orderedWineCountries.map(country => country.code)
  ) || [];

  return (
    <div className="WineOrderedCountries">
      <VectorMap
        map="world_mill"
        backgroundColor="#FFFFFF"
        regionStyle={{
          initial: {
            fill: '#ffe4e9',
            fillOpacity: 1,
            stroke: 'none',
            strokeWidth: 0,
            strokeOpacity: 1,
          },
          hover: {
            fillOpacity: 0.8,
            cursor: 'pointer',
          },
          selected: {
            fill: '#fa6f7d',
          },
          selectedHover: {},
        }}
        containerStyle={{
          width: '100%',
          height: '100%',
          minHeight: 450,
          backgroundColor: '#FFFFFF',
          borderColor: '#fa6f7d',
          borderOpacity: 0.25,
          borderWidth: 1,
          color: '#ffe4e9',
        }}
        zoomMax={1}
        zoomMin={1}
        zoomOnScroll={false}
        containerClassName="map"
        selectedRegions={countries}
        enableZoom="false"
      />
    </div>
  );
};

WineOrderedCountries.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default WineOrderedCountries;
