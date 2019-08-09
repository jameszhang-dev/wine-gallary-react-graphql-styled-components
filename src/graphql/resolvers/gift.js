import gql from 'graphql-tag';

/**
 * GraphQL Mutations
 * */

export const SET_GIFT_FLOW_INFO = gql`
  mutation setGiftFlowInfo(
    $months: Int,
    $winePricePointId: Int,
    $step: Int,
    $fromMemberId: Int,
    $toMemberEmail: String,
    $toMemberFirstName: String,
    $toMemberLastName: String,
    $toMemberPersonalNote: String,
    $holdUntilDate: String,
    $giftDeliveryId: Int,
    $giftTemplateId: Int,
    $toMemberShippingAddressId: Int,
    $toMemberMobileCountryCode: String,
    $toMemberMobileNumber: String,
    $redBottles: Int,
    $whiteBottles: Int,
    $sparklingBottles: Int,
    $roseBottles: Int,
  ) {
    setGiftFlowInfo(
      months: $months,
      winePricePointId: $winePricePointId,
      step: $step,
      fromMemberId: $fromMemberId,
      toMemberEmail: $toMemberEmail,
      toMemberFirstName: $toMemberFirstName,
      toMemberLastName: $toMemberLastName,
      toMemberPersonalNote: $toMemberPersonalNote,
      holdUntilDate: $holdUntilDate,
      giftDeliveryId: $giftDeliveryId,
      giftTemplateId: $giftTemplateId,
      toMemberShippingAddressId: $toMemberShippingAddressId,
      toMemberMobileCountryCode: $toMemberMobileCountryCode,
      toMemberMobileNumber: $toMemberMobileNumber,
      redBottles: $redBottles,
      whiteBottles: $whiteBottles,
      sparklingBottles: $sparklingBottles,
      roseBottles: $roseBottles,
    ) @client {
      giftFlow @client{
        months
        winePricePointId
        step
        fromMemberId
        toMemberEmail
        toMemberFirstName
        toMemberLastName
        toMemberPersonalNote
        holdUntilDate
        giftDeliveryId
        giftTemplateId
        toMemberShippingAddressId
        toMemberMobileCountryCode
        toMemberMobileNumber
        redBottles
        whiteBottles
        sparklingBottles
        roseBottles
        __typename
      }
    }
  }
`;

export const SET_GIFT_FLOW_SIGN_UP_FORM_INFO = gql`
  mutation setGiftFlowSignUpFormInfo(
    $email: String,
    $firstName: String,
    $lastName: String,
    $password: String,
    $birthDate: String,
    $confirmPassword: String,
  ) {
    setGiftFlowSignUpFormInfo(
      email: $email,
      firstName: $firstName,
      lastName: $lastName,
      password: $password,
      birthDate: $birthDate,
      confirmPassword: $confirmPassword,
    ) @client {
      giftFlowSignUpForm @client{
        email
        firstName
        lastName
        password
        birthDate
        confirmPassword
        __typename
      }
    }
  }
`;

export const REDEEM_GIFT = gql`
  mutation RedeemGift($input: RedeemGiftInput!) {
    redeemGift(input: $input) {
      isValid
      member {
        id
        firstName
        hasUpdatedPassword
        hasPendingGift
      }
      errors {
        messages
        field
      }
    }
  }
`;

/**
 * GraphQL Queries
 * */

export const GET_GIFT_FLOW_INFO = gql`
  query GiftFlow {
    giftFlow @client{
      months
      winePricePointId
      step
      fromMemberId
      toMemberEmail
      toMemberFirstName
      toMemberLastName
      toMemberPersonalNote
      holdUntilDate
      giftDeliveryId
      giftTemplateId
      toMemberShippingAddressId
      toMemberMobileCountryCode
      toMemberMobileNumber
      redBottles
      whiteBottles
      sparklingBottles
      roseBottles
      __typename
    }
  }
`;

export const GET_GIFT_FLOW_SIGN_UP_FORM_INFO = gql`
  query GiftFlowSignUpForm {
    giftFlowSignUpForm @client{
      email
      firstName
      lastName
      password
      birthDate
      confirmPassword
      __typename
    }
  }
`;

export const GET_ALL_GIFT_DELIVERIES = gql`
  query AllGiftDeliveries {
    allGiftDeliveries {
      id
      name
    }
  }
`;

export const GET_ALL_GIFT_PLANS = gql`
  query AllGiftPLans {
    allGiftPlans {
      id
      product {
        id
      }
      winePricePoint {
        id
        name
        isEnabled
        sellingPrice
      }
    }
  }
`;

export const GET_ALL_GIFT_TEMPLATES = gql`
  query AllGiftTemplates {
    allGiftTemplates {
      id
      giftDelivery {
        id
        name
      }
      name
      isEnabled
    }
  }
`;

export const GET_GIFT_PLAN = gql`
  query GiftPlan ($winePricePointId: Int!, $months: Int!, $bottles: Int){
    giftPlan (winePricePointId: $winePricePointId, months: $months, bottles: $bottles) {
      id
      months
      bottles
      winePricePoint {
        id
      }
      product {
        id
      }
    }
  }
`;

/**
 * Resolvers, Defaults & Type definitions
 * https://www.apollographql.com/docs/link/links/state
 * */
export const resolverGiftFlow = {
  defaults: {
    giftFlow: {
      months: null,
      winePricePointId: null,
      step: 1,
      fromMemberId: null,
      toMemberEmail: '',
      toMemberFirstName: '',
      toMemberLastName: '',
      toMemberPersonalNote: '',
      holdUntilDate: null,
      giftDeliveryId: null,
      giftTemplateId: null,
      toMemberShippingAddressId: null,
      toMemberMobileCountryCode: '',
      toMemberMobileNumber: '',
      redBottles: null,
      whiteBottles: null,
      sparklingBottles: null,
      roseBottles: null,
      __typename: 'GiftFlowObjectStore',
    },
    giftFlowSignUpForm: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: '',
      confirmPassword: '',
      __typename: 'GiftFlowSignUpFormObject',
    },
  },
  resolvers: {
    Mutation: {
      setGiftFlowInfo: async (obj, args, { cache }) => {
        const data = {
          __typename: 'Store',
          giftFlow: {
            __typename: 'GiftFlowObjectStore',
            ...args,
          },
        };
        await cache.writeData({ data });
        return data;
      },
      setGiftFlowSignUpFormInfo: async (obj, args, { cache }) => {
        const data = {
          __typename: 'Store',
          giftFlowSignUpForm: {
            __typename: 'GiftFlowSignUpFormObject',
            ...args,
          },
        };
        await cache.writeData({ data });
        return data;
      },
    },
  },
  typeDefs: gql`
    type GiftFlowObjectStore {
      months: Int
      winePricePointId: Int
      step: Int
      fromMemberId: Int
      toMemberEmail: String
      toMemberFirstName: String
      toMemberLastName: String
      toMemberPersonalNote: String
      holdUntilDate: String
      giftDeliveryId: Int
      giftTemplateId: Int
      toMemberShippingAddressId: Int
      toMemberMobileCountryCode: String
      toMemberMobileNumber: String
      redBottles: Int
      whiteBottles: Int
      sparklingBottles: Int
      roseBottles: Int
      giftFlowSignUpForm: GiftFlowSignUpFormObject
    }
    type GiftFlowSignUpFormObject {
      firstName: String
      lastName: String
      email: String
      password: String
      birthDate: String
      confirmPassword: String
    }
    type Query {
      giftFlow: GiftFlowObjectStore
    }
    type Mutation {
      setMemberAuth(memberId: Int!): GiftFlowObjectStore!
    }
  `,
};
