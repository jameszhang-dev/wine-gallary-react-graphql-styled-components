import gql from 'graphql-tag';

/**
 * QUERIES
 * */

const GET_MEMBER_BADGES_BY_CATEGORY = gql`
  query MemberBadgesByCategory (
    $memberId: Int!
    $badgeCategoryId: Int!
    $limit: Int
    $offset: Int
  ) {
    memberBadgesByCategory (
      memberId: $memberId
      badgeCategoryId: $badgeCategoryId
      limit: $limit
      offset: $offset
    ) {
      id
      name
      level
      isEarned
      imageSmallUrl
    }
  }
`;

export {
  GET_MEMBER_BADGES_BY_CATEGORY, // eslint-disable-line import/prefer-default-export
};
