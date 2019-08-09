import ReactDOM from 'react-dom';
import React from 'react';

import gql from 'graphql-tag';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';

import SubscriptionStatus from './SubscriptionStatus';

const MEMBER_DUMMY_QUERY = gql`
  {
    me {
      id
      subscription {
        id
        billingDay
        monthFrequency
        holdUntilDate
        subscriptionStatus {
          id
          name
        }
      }
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
        me: {
          id: 1,
          subscription: {
            id: 1,
            billingDay: 17,
            monthFrequency: 2,
            holdUntilDate: null,
            subscriptionStatus: {
              id: 2,
              name: 'ACTIVE',
            },
          },
        },
      },
    },
  },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <SubscriptionStatus me={MEMBER_DUMMY_QUERY} name="Member Information" />
      </BrowserRouter>
    </MockedProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
