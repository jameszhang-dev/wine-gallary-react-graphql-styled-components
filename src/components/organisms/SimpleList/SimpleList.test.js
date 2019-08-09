import ReactDOM from 'react-dom';
import React from 'react';

import gql from 'graphql-tag';
import { MockedProvider } from 'react-apollo/test-utils';

import SimpleList from './SimpleList';

const DUMMY_QUERY = gql`
  {
    allItems {
      id
    }
  }
`;

const mocks = [
  {
    request: {
      query: DUMMY_QUERY,
    },
    result: {
      data: {
        allWines: { id: 1 },
      },
    },
  },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <SimpleList query={DUMMY_QUERY} name="Simple List" />
    </MockedProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
