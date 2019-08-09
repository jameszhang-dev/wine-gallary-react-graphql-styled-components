import React from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import { GET_MEMBER } from '../../graphql/queries';

import './MyOrders.scss';

/**
 * Renders MyOrders component.
 * */
const MyOrders = props => {
  const { meQuery } = props;
  return (
    <div className="MyOrders">
      <div className="MyOrders--container">
        <div className="MyOrders--table">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>date</th>
                <th>status</th>
                <th>tracking</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              {meQuery.me && meQuery.me.chargedOrders.map(order => {
                const trackingCode = order.delivery ? order.delivery.trackingCode : '-';
                const trackingUrl = order.delivery && order.delivery.trackingUrl;
                const date = new Date(order.chargeDate);

                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{date.toDateString()}</td>
                    <td>{order.orderStatus.name}</td>
                    <td>{trackingUrl ? <a href={trackingUrl}>{trackingCode}</a> : '-' }</td>
                    <td>{order.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

MyOrders.propTypes = {
  meQuery: PropTypes.shape({}).isRequired,
};

export default compose(
  graphql(GET_MEMBER, { name: 'meQuery' })
)(MyOrders);
