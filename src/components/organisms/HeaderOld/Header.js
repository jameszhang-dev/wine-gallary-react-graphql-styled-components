import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { Link, NavLink } from 'react-router-dom';

import { ShoppingCart, HeaderDiscountMessage } from '../..';
import { isLoggedIn } from '../../../helpers/auth';
import urlPatterns from '../../../urls';

import logo from '../../../assets/images/logo.svg';
import './Header.scss';

/**
 * Renders main header for the application.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class Header extends Component {
  static propTypes = {
    client: PropTypes.shape({}), // Apollo client coming form withApollo
    persistentCache: PropTypes.shape({}),
  };

  static defaultProps = {
    client: null,
    persistentCache: null,
  };

  componentDidMount() {}

  handleLogout = event => {
    event.preventDefault();

    const { client, persistentCache } = this.props;

    // Logs user out from application once they land back in to Login page
    if (localStorage.getItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE)) {
      window.location = `${process.env.REACT_APP_BASE_URL}${urlPatterns.HOME}`;

      // Removes all the state from session and local storage
      client.resetStore();
      persistentCache.purge();
      localStorage.removeItem(process.env.REACT_APP_AUTH_LOCAL_STORAGE);
      localStorage.removeItem(process.env.REACT_APP_STORE_LOCAL_STORAGE);
    }
  };

  render() {
    return (
      <div className="Header">
        <div className="Header--container">
          <section className="Header--brand">
            <Link to="/home">
              <img src={logo} className="Header--brand__logo" alt="The Wine Gallery" />
            </Link>
          </section>
          <HeaderDiscountMessage />
          <nav className="Header--main-navigation">
            <ul className="Header--main-navigation--list">
              <li>
                <NavLink to={urlPatterns.HOME}>Home</NavLink>
              </li>
              <li>
                <NavLink to={urlPatterns.QUIZ}>Quiz</NavLink>
              </li>
              <li>
                <NavLink to={urlPatterns.WINES}>Wines</NavLink>
              </li>
              <li>
                <NavLink to={urlPatterns.SPECIAL_PACKS}>Special Boxes</NavLink>
              </li>
              <li>
                <NavLink to={urlPatterns.GIFTS}>Gifts</NavLink>
              </li>
              {
                !isLoggedIn() && (
                  <li>
                    <NavLink to={urlPatterns.SIGN_UP}>SignUp</NavLink>
                  </li>
                )
              }
              {
                isLoggedIn() && (
                  <li>
                    <NavLink to={urlPatterns.INVITE_FRIEND}>Invite Friends</NavLink>
                  </li>
                )
              }
              {
                isLoggedIn() && (
                  <li>
                    <NavLink to={urlPatterns.WINES_BOX}>My Wine Box</NavLink>
                  </li>
                )
              }
              {
                isLoggedIn() && (
                  <li>
                    <NavLink to={urlPatterns.DASHBOARD}>Dashboard</NavLink>
                  </li>
                )
              }
              {
                isLoggedIn() && (
                  <li>
                    <NavLink to={urlPatterns.RATINGS}>Rate your Wines</NavLink>
                  </li>
                )
              }
              {
                isLoggedIn() && (
                  <li>
                    <NavLink to={urlPatterns.MY_ACCOUNT}>My Account</NavLink>
                  </li>
                )
              }
              <li>
                {isLoggedIn()
                  ? <button type="button" onClick={e => this.handleLogout(e)}>Logout</button>
                  : <NavLink to={urlPatterns.LOGIN}>Login</NavLink>
                }
              </li>
              <li>
                <ShoppingCart />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default withApollo(Header);
