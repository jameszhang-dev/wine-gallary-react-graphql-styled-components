import gql from 'graphql-tag';

export const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscription ($input:  SubscriptionInput!){
    updateSubscription(input: $input) {
      subscription {
        id
        billingDay
        subscriptionStatus {
          id
          name
        }
        holdUntilDate
        monthFrequency
      }
      errors{
        field
        messages
      }
    }
  }
`;

export const DELETE_WINE_FROM_QUIZ_BOX = gql`
  mutation DeleteWineFromQuizBox($input: GenericSubscriptionWineInput!) {
    deleteWineFromQuizBox(input: $input) {
      isSuccessful
      errors {
        field
        messages
      }
    }
  }
`;

export const ADD_WINE_TO_QUIZ_BOX = gql`
  mutation AddWineToQuizBox($input: GenericSubscriptionWineInput!) {
    addWineToQuizBox(input: $input) {
      errors {
        field
        messages
      }
    }
  }
`;
