import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatNumber } from '../../../helpers/tools';
import { FreeShipping } from '../..';

import './OrderSummary.scss';

/**
 * Renders OrderSummary component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
const OrderSummary = props => {
  const { me } = props;

  // Renders message in case user does not have any item on their shopping cart
  if (
    !me.shoppingCart || !me.shoppingCart.shoppingcartitemSet || !me.shoppingCart.shoppingcartitemSet.length
  ) {
    return (
      <div className="OrderSummary">
        <div className="OrderSummary--container">
          <div className="OrderSummary--container__inner">
            Sorry you have no items in your shopping cart. Check our wines in our
            <Link to="/wines"> wine list.</Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    shoppingcartitemSet,
    total,
    totalProductsCost,
    totalShippingFee,
    discountCode,
    discount,
  } = me.shoppingCart;

  return (
    <div className="OrderSummary">
      <div className="OrderSummary--container">
        <div className="OrderSummary--container__inner">
          <h2>Order Summary</h2>
          <ul>
            {shoppingcartitemSet.map(wine => (
              <li key={wine.product.id}>
                <span>
                  {
                    `${wine.product.name} |
                    $${formatNumber(wine.product.sellingPrice)} |
                    ${wine.quantity}`
                  }
                </span>
              </li>
            ))}
          </ul>
          {totalShippingFee > 0 && <div>{`Shipping fee: $${formatNumber(totalShippingFee)}`}</div>}
          {total && <div>{`Total: $${formatNumber(totalProductsCost)}`}</div>}
          {
            discount && (
              <div>
                <br />
                {discountCode && <div>{`Discount code: ${discountCode}`}</div>}
                {
                  discount && (
                    <div>
                      {`Discount applied: $${formatNumber(discount)}`}
                    </div>)
                }
                {`Final total: $${formatNumber(total)}`}
              </div>
            )
          }
        </div>
        <FreeShipping />
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.number,
    shoppingCart: PropTypes.shape({
      discount: PropTypes.number,
      discountCode: PropTypes.string,
    }),
  }),
};

OrderSummary.defaultProps = {
  me: {},
};

export default OrderSummary;
