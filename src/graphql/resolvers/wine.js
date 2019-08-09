import gql from 'graphql-tag';

export const GET_WINE_COUNTRIES = gql`
  query WineCountries {
    allWineCountries {
      id
      name
    }
  }
`;

export const GET_TASTES = gql`
  query Tastes {
    allTastes {
      id
      name
    }
  }
`;

export const GET_FOODS = gql`
  query Foods {
    allFoods {
      id
      name
    }
  }
`;

export const GET_SEASONS = gql`
  query Seasons {
    allSeasons {
      id
      name
    }
  }
`;

export const GET_WINE_PRODUCTIONS = gql`
  query WineProductions {
    allWineProductionMethods {
      id
      name
    }
  }
`;

export const GET_WINE_COLOURS = gql`
  query WineColours {
    allWineClasses {
      id
      name
    }
  }
`;

export const GET_WINE_TYPES = gql`
  query WineTypes {
    allWineTypes {
      id
      name
    }
  }
`;

export const GET_WINE_PRICE_POINTS = gql`
  query WinePricePoints {
    allWinePricePoints {
      id
      name
      sellingPrice
    }
  }
`;

export const GET_WINE_BODIES = gql`
  query WineBodies {
    allWineBodies {
      id
      name
    }
  }
`;

export const GET_WINE_TANNINS = gql`
  query WineTannins {
    allWineTannins{
      id
      name
    }
  }
`;

export const GET_WINE_SWEETNESSES = gql`
  query WineSweetnesses {
    allWineSweetnesses{
      id
      name
    }
  }
`;

export const GET_WINE_SLUG = gql`
  query GetWineById (
    $id: Int!
  ) {
    wine (
      id: $id
    ) {
      product {
        slug
      }
    }
  }
`;

export const GET_WINE = gql`
  query GetWine (
    $slug: String!
    $memberId: Int
  ) {
    wine (
      slug: $slug
      memberId: $memberId
    ) {
      id
      hasStock
      memberLikelihood
      fullDescription
      sommelierNotes
      pairingsDescription
      alcoholPercentage
      videoUrl
      year
      oakAged
      product {
        id
        name
        slug
        productType{
          id
        }
        sellingPrice
        skuCode
        coverPhotoLarge
        productPhotos {
          photoLarge
        }
      }
      country {
        id
        name
      }
      wineRegion {
        id
        name
      }
      wineType {
        id
        name
        wineClass {
          id
          name
        }
      }
      wineMaker {
        id
        name
      }
      wineSweetness {
        id
        level
        name
      }
      wineBody {
        id
        level
        name
      }
      wineTannin {
        id
        level
        name
      }
      wineAcidity {
        id
        level
        name
      }
      wineCellarPeriod {
        id
        name
        shortDescription
      }
      wineProductionMethods {
        id
        name
      }
      wineBarrelType {
        name
        id
      }
      tastes {
        id
        name
      }
      food {
        id
        name
      }
      seasons {
        id
        name
      }
      moods {
        id
        name
      }
      memberWineLists {
        id
        name
        sortOrder
      }
    }
  }
`;

export const GET_WINES = gql`
  query GetWines (
    $year: String
    $wineClassId: Int
    $winePricePointId: Int
    $wineTypeId: Int
    $wineBodyId: Int
    $wineSweetnessId: Int
    $wineTanninId: Int
    $wineStyleId: Int
    $wineProductionMethodId: Int
    $seasonId: Int
    $tasteId: Int
    $foodId: Int
    $countryId: Int
    $order: AllWinesOrderField
    $memberId: Int
  ) {
    allWines (
      year: $year
      winePricePointId: $winePricePointId
      wineClassId: $wineClassId
      wineTypeId: $wineTypeId
      wineBodyId: $wineBodyId
      wineSweetnessId: $wineSweetnessId
      wineTanninId: $wineTanninId
      wineStyleId: $wineStyleId
      wineProductionMethodId: $wineProductionMethodId
      seasonId: $seasonId
      tasteId: $tasteId
      foodId: $foodId
      countryId: $countryId
      order: $order
      memberId: $memberId
    ) {
      id
      memberLikelihood
      year
      country {
        id
        name
      }
      product {
        id
        name
        slug
        sellingPrice
        productType{
          id
        }
        productPhotos {
          id
          photoWineListing
          photoLarge
        }
      }
      wineType {
        id
        name
        wineClass {
          id
          name
        }
      }
      wineRegion {
        id
        name
      }
    }
  }
`;

