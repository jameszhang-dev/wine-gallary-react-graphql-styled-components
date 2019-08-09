import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { compose, withApollo } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import styled from 'styled-components';

import { HeaderUser, NotificationButton } from '../..';
import urlPatterns from '../../../urls';

import { fonts } from '../../../styles/variables';
import breakpoints from '../../../styles/breakpoints';

const StyledHeaderLoggedIn = styled.div`
  ${breakpoints.mdUp} {
    order: 3;
    justify-content: flex-end;
  }
  margin-left: 20px;
  display: flex;
  align-items: center;
  ${breakpoints.mdDown} {
    margin-left: auto;
  }
`;

const StyledHeaderLogOutBtn = styled.a`
  text-transform: uppercase;
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  font-family: ${fonts.fontInterstateUltraBlack};
  ${breakpoints.mdDown} {
    display: none;
  }
`;

class HeaderLoggedIn extends Component {

  static propTypes = {
    client: PropTypes.shape({}), // Apollo client coming form withApollo
    persistCache: PropTypes.shape({}),
  };

  static defaultProps = {
    client: null,
    persistCache: null,
  };

  handleLogout = event => {
    event.preventDefault();

    if (localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE)) {
      window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.HOME}`;

      const { client } = this.props;

      // TODO (DEV-401) Instead of recreating the below, try to extract it from Apollo
      const cache = new InMemoryCache();
      const cachePersistor = new CachePersistor({
        cache,
        storage: window.sessionStorage,
        key: process.env.REACT_APP_STORE_LOCAL_STORAGE,
      });

      // Removes all the state from session and local storage
      client.resetStore();
      cachePersistor.purge();
      localStorage.removeItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE);
      localStorage.removeItem(process.env.REACT_APP_STORE_LOCAL_STORAGE);
    }
  };

  render() {
    return (
      <StyledHeaderLoggedIn>
        <NotificationButton />
        <HeaderUser />
        <StyledHeaderLogOutBtn onClick={e => this.handleLogout(e)}>Log out</StyledHeaderLogOutBtn>
      </StyledHeaderLoggedIn>
    );
  }
}

export default compose(
  withApollo,
  withRouter,
)(HeaderLoggedIn);
