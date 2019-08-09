import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { compose, graphql } from 'react-apollo';

import { WineListSelection } from '../..';
import { isLoggedIn } from '../../../helpers/auth';
import { FETCH_POLICY_CACHE_ONLY } from '../../../helpers/constants';
import { GET_AUTH } from '../../../graphql/resolvers/auth';

import './AddWineToList.scss';

/**
 * Renders the button which allows a member to add a wine to one of his own lists (e.g. favourites).
 * */
class AddWineToList extends Component {

  static propTypes = {
    wine: PropTypes.shape({}).isRequired,
    authQuery: PropTypes.shape({}).isRequired,
  };

  state = {
    showLists: false,
  };

  /**
   * Handles open and close of the member's wine lists.
   * */
  handleOpenCloseWineLists = () => {

    const { showLists } = this.state;
    this.setState({
      showLists: !showLists,
    });

  };

  render() {

    const { wine, authQuery } = this.props;
    const { showLists } = this.state;
    let wineLists = <div>You need to sign-up or log-in to access your wine lists.</div>;

    if (authQuery.loading || !authQuery.auth) return <div>Loading...</div>;

    if (isLoggedIn) {
      wineLists = <WineListSelection memberId={authQuery.auth.memberId} wine={wine} />;
    }

    return (
      <div className="AddWineToList">
        <button type="button" onClick={this.handleOpenCloseWineLists}>
          Add to list
        </button>
        {showLists && wineLists}
      </div>
    );

  }
}

export default compose(
  graphql(GET_AUTH, { name: 'authQuery', options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY } }),
)(AddWineToList);
