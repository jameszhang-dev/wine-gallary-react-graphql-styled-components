import gql from 'graphql-tag';
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';

import WineItems from './WineItems';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();

  const memberId = '1234';
  const item = {
    id: '1',
    product: {
      name: 'test product',
    },
    country: {
      name: 'test country',
    },
    wineType: {
      name: 'test type',
      wineClass: {
        name: 'test class',
      },
    },
  };
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

  renderer.render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <WineItems data={item} memberId={memberId} name="Simple Item" />
      </BrowserRouter>
    </MockedProvider>
  );
});
