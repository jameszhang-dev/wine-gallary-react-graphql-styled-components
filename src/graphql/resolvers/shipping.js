/* eslint import/prefer-default-export: 0 */
import gql from 'graphql-tag';

/**
 * QUERIES
 * */

export const GET_ALL_SHIPPING_PRE_PAID_PLANS = gql`
  query AllShippingPrePaidPlans {
    allShippingPrePaidPlans {
      id
      months
      product {
        id
        name
      }
    }
  }
`;
