import gql from 'graphql-tag';

/**
 * QUERIES
 * */

export const GET_FREE_BOX_CAMPAIGN = gql`
  query FreeBoxCampaign (
  $seoCampaignName: String!
  ) {
    freeBoxCampaign (
      seoCampaignName: $seoCampaignName
    ) {
      id
      isAvailable
      totalBoxesAvailable
      seoTitle
      seoDescription
      seoCampaignName
      buyButtonText
      heroTopTheme
      heroTopImageLargeUrl
      heroTopTextPosition
      heroTopTitle
      heroTopSubTitle
      heroMonthlyLimitReachedText
      heroBottomTheme
      heroBottomImageLargeUrl
      heroBottomTitle
      heroBottomSubTitle
      section1ImageLargeUrl
      section1Title
      section1Text
      section2ImageLargeUrl
      section2Title
      section2Text
      section3ImageLargeUrl
      section3Title
      section3Text
    }
  }
`;

export const GET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT = gql`
  query GuestFreeBoxCampaignDiscount {
    guestFreeBoxCampaignDiscount @client{
      freeBoxCampaignId
    }
  }
`;

/**
 *  MUTATIONS
 * */

export const APPLY_DISCOUNT_CODE = gql`
  mutation AddPromoCodeInfo($input: PromoCodeInfoInput!){
  addPromoCodeInfo(input: $input) {
    name
    discountValue
    message
    errors {
      field
      messages
    }
  }
}
`;

export const APPLY_DISCOUNT_FROM_FREE_BOX_CAMPAIGN = gql`
  mutation ApplyDiscountFromFreeBoxCampaign($input: ApplyDiscountFromFreeBoxCampaignInput!) {
    applyDiscountFromFreeBoxCampaign(input: $input) {
      isSuccessful
      errors {
        field
        messages
      }
    } 
  }
`;

export const SET_GUEST_FREE_BOX_CAMPAIGN_DISCOUNT = gql`
  mutation SetGuestFreeBoxCampaignDiscount(
    $freeBoxCampaignId: Int,
  ) {
    setGuestFreeBoxCampaignDiscount(
      freeBoxCampaignId: $freeBoxCampaignId,
    ) @client {
      guestFreeBoxCampaignDiscount @client {
        freeBoxCampaignId
      }
    }
  }
`;

export const ADD_FREE_BOX_CAMPAIGN_INTEREST = gql`
  mutation RegisterFreeBoxCampaignInterest($input: RegisterFreeBoxCampaignInterestInput!) {
    registerFreeBoxCampaignInterest(input: $input) {
      isSuccessful
      errors {
        field
        messages
      }
    } 
  }
`;

/**
 * Resolvers, Defaults & Type definitions
 * https://www.apollographql.com/docs/link/links/state
 * */
export const resolverGuestFreeBoxCampaignDiscount = {
  defaults: {
    guestFreeBoxCampaignDiscount: {
      freeBoxCampaignId: null,
      __typename: 'GuestFreeBoxCampaignDiscountObjectStore',
    },
  },
  resolvers: {
    Mutation: {
      setGuestFreeBoxCampaignDiscount: async (obj, args, { cache }) => {
        const data = {
          __typename: 'Store',
          guestFreeBoxCampaignDiscount: {
            __typename: 'GuestFreeBoxCampaignDiscountObjectStore',
            ...args,
          },
        };
        await cache.writeData({ data });
        return data;
      },
    },
  },
};
