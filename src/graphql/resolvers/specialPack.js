import gql from 'graphql-tag';

/**
 * QUERIES
 * */

export const GET_ALL_SPECIAL_PACKS = gql`
  query AllSpecialPackEditions (
    $limit: Int
    $offset: Int
  ) {
    allSpecialPackEditions (
      limit: $limit
      offset: $offset
    ) {
      id
      name
      heroTopImageLargeUrl
      section1Title
      section1Text
      seoTitle
      seoDescription
      heroTopImageLargeUrl
      isAvailable
      slug
    }
  }
`;

export const GET_SPECIAL_PACK_DETAILS = gql`
  query SpecialPackEdition (
  $slug: String!
  ) {
    specialPackEdition (
      slug: $slug
    ) {
      id
      name
      slug
      heroTopImageLargeUrl
      buyButtonText
      heroTopTitle
      heroTopSubTitle
      heroTopTheme
      heroTopTextPosition
      heroDisabledText
      section1Title
      section1Text
      section2Title
      section2Text
      section3Title
      section3Text
      heroBottomTitle
      heroBottomSubTitle
      heroBottomTheme
      seoTitle
      seoDescription
      heroTopImageLargeUrl
      heroBottomImageLargeUrl
      section1ImageLargeUrl
      section2ImageLargeUrl
      section3ImageLargeUrl
      isAvailable
      specialpackoptionSet {
        id
        displayName
        sortOrder
        product {
          id
          name
          isEnabled
          productType {
            id
            isEnabled
            name
          }
          coverPhotoLarge
          slug
          skuCode
          sellingPrice
          productPhotos {
            id
            photoLarge
            photoWineListing
          }
          wine {
            id
            wineMaker  {
              name
              id
            }
            product  {
              name
              id
              productType {
                id
                name
              }
              productPhotos {
                id
                photoLarge
              }
              sellingPrice
            }
            wineType {
              name
              id
            }
            wineRegion {
              name
              id
            }
            country  {
              name
              id
              code
            }
            wineBody {
              name
              id
            }
            wineTannin {
              name
              id
            }
            wineAcidity {
              name
              id
            }
            wineSweetness {
              name
              id
            }
            wineBarrelType {
              name
              id
            }
            wineCellarPeriod {
              name
              id
            }
            wineProductionMethods  {
              name
              id
            }
            fullDescription
            country {
              id
              name
              code
            }
            food {
              name
              id
            }
            moods  {
              name
              id
            }
            tastes {
              name
              id
            }
            year
            alcoholPercentage
            sommelierNotes
            videoUrl
            pairingsDescription
            oakAged
            memberLikelihood
          }
        }
      }
    }
  }
`;

/**
 * MUTATIONS
 * */
export const ADD_SPECIAL_PACK_INTEREST = gql`
  mutation RegisterSpecialPackInterest($input: RegisterSpecialPackInterestInput!) {
    registerSpecialPackInterest(input: $input) {
      isSuccessful
      errors {
        field
        messages
      }
    } 
  }
`;
