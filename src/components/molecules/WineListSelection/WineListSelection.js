import PropTypes from 'prop-types';
import React from 'react';

import { compose, graphql } from 'react-apollo';

import { CreateWineList, WineListSelectionItem } from '../..';
import { GET_MEMBER, GET_WINE } from '../../../graphql/queries';
import {
  FETCH_POLICY_CACHE_FIRST,
  FETCH_POLICY_NO_CACHE,
  WINE_LIST_TYPE_IDS,
} from '../../../helpers/constants';

import './WineListSelection.scss';

/**
 * Renders the wine lists menu for the given member with the option to create a new one.
 * */
const WineListSelection = props => {

  const {
    meQuery,
    wineQuery,
    memberId,
    wine,
  } = props;

  if (meQuery.loading || meQuery.networkStatus === 4 || !meQuery.me || (wineQuery && wineQuery.loading)) {
    return <div>Loading...</div>;
  }

  // Loads member wine lists, except the "recommended to me" one
  const memberWineLists = meQuery.me.winelistSet.filter(
    wineList => wineList.wineListType.id !== WINE_LIST_TYPE_IDS.DB_ID_WINE_LIST_TYPE_MEMBER_RECOMMENDED
  );

  // Loads selected wine lists for this given wine and member
  const updatedWine = wine.memberWineLists ? wine : wineQuery.wine;

  return (
    <div className="WineListSelection--container">
      <ul className="WineListSelection--items">
        {memberWineLists.map(wineList => (
          <li key={wineList.id}>
            <WineListSelectionItem
              memberId={memberId}
              wine={updatedWine}
              wineList={wineList}
            />
          </li>
        ))}
        <li><CreateWineList memberId={memberId} /></li>
      </ul>
    </div>
  );
};

WineListSelection.propTypes = {
  memberId: PropTypes.number.isRequired,
  wine: PropTypes.shape({}).isRequired,
  meQuery: PropTypes.shape({}).isRequired,
  wineQuery: PropTypes.shape({}),
};

WineListSelection.defaultProps = {
  wineQuery: {},
};

export default compose(
  graphql(GET_MEMBER, {
    name: 'meQuery',
    options: {
      fetchPolicy: FETCH_POLICY_CACHE_FIRST,
    },
  }),
  graphql(GET_WINE, {
    name: 'wineQuery',
    skip: props => typeof props.wine.memberWineLists !== 'undefined',
    options: props => ({
      partialRefetch: true,
      fetchPolicy: FETCH_POLICY_NO_CACHE,
      variables: {
        slug: props.wine.product.slug,
        memberId: props.memberId,
      },
    }),
  }),
)(WineListSelection);
