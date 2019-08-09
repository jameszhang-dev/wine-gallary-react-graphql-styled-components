import React from 'react';
import ReactDOM from 'react-dom';

import { MockedProvider } from 'react-apollo/test-utils';

import gql from 'graphql-tag';

import { UPDATE_SHOPPING_CART_ITEM } from '../../../graphql/mutations';
import ButtonMutation from './ButtonMutation';

it('renders without crashing', () => {
  const div = document.createElement('div');

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
          me: { id: '1234' },
        },
      },
    },
  ];

  ReactDOM.render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ButtonMutation label="Label" input={{ id: 1234 }} mutationProp={UPDATE_SHOPPING_CART_ITEM} />
    </MockedProvider>,
    div
  );
});
