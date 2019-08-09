import ReactDOM from 'react-dom';
import React from 'react';

import gql from 'graphql-tag';
import { MockedProvider } from 'react-apollo/test-utils';

import CheckoutShippingAddressForm from './CheckoutShippingAddressForm';

const MEMBER_DUMMY_QUERY = gql`
  {
    me {
      id
    }
  }
`;

const mocks = [
  {
    request: {
      query: MEMBER_DUMMY_QUERY,
    },
    result: {
      data: {
        me: { id: 1 },
      },
    },
  },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CheckoutShippingAddressForm me={MEMBER_DUMMY_QUERY} name="Member Information" />
    </MockedProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
