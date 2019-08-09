import gql from 'graphql-tag';

/**
 * GraphQL Mutations
 * */

export const SET_MEMBER_AUTH = gql`
  mutation setMemberAuth($memberId: Int!, $token: String!) {
    setMemberAuth(memberId: $memberId, token: $token) @client {
      auth {
        memberId
        token
        __typename
      }
    }
  }
`;

/**
 * GraphQL Queries
 * */

export const GET_AUTH = gql`
  query getAuth {
    auth @client {
      memberId
      token
    }
  }
`;

/**
 * Resolvers, Defaults & Type definitions
 * https://www.apollographql.com/docs/link/links/state
 * */
export const resolverAuth = {
  defaults: {
    auth: {
      memberId: null,
      token: null,
      __typename: 'AuthObjectStore',
    },
  },
  resolvers: {
    Mutation: {
      setMemberAuth: async (obj, args, { cache }) => {
        const data = {
          __typename: 'Store',
          auth: {
            __typename: 'AuthObjectStore',
            token: args.token,
            memberId: args.memberId,
          },
        };
        await cache.writeData({ data });
        return data;
      },
    },
  },
  typeDefs: gql`
    type AuthObjectStore {
      memberId: Int!
      token: String!
    }
    type Query {
      auth: AuthObjectStore
    }
    type Mutation {
      setMemberAuth(memberId: Int!): AuthObjectStore!
    }
  `,
};
