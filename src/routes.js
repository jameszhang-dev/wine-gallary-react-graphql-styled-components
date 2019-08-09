import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  Home, PasswordReset, SetNewPassword, SignUp, Quiz, QuizResults, SpecialPacks, SpecialPackDetails, Gifts,
  WineRatings, InviteFriend, GiveFreeTrial, RedeemGift, FreeBoxCampaign,
} from './pages';
import ThankYou from './pages/ThankYou/ThankYou';
import urlPatterns from './urls';
import { isLoggedIn } from './helpers/auth';

// Declares lazily loaded components --> https://reactjs.org/docs/code-splitting.html#reactlazy
const Wines = React.lazy(() => import('./pages/Wines/Wines'));
const WineDetails = React.lazy(() => import('./pages/WineDetails/WineDetails'));
const WineDetailsById = React.lazy(() => import('./pages/WineDetailsById/WineDetailsById'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Referral = React.lazy(() => import('./pages/Referral/Referral'));
const MyAccount = React.lazy(() => import('./pages/MyAccount/MyAccount'));
const MyOrders = React.lazy(() => import('./pages/MyOrders/MyOrders'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const DashboardBadges = React.lazy(() => import('./pages/DashboardBadges/DashboardBadges'));
const Checkout = React.lazy(() => import('./pages/Checkout/Checkout'));

/**
 * Protects routes (pages) that require login to be visualized, as example My Account page
 * @param ChildComponent
 * @param rest
 * @return {React.Component}: stateless component
 * */
const PrivateRoute = ({ component: ChildComponent, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn() ? (<ChildComponent {...props} />) : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    ))
    }
  />);

/**
 * Stores routing management, this is where we map url path and pages (component container)
 * */
class Routes extends Component {
  static propTypes = {};

  static contextTypes = {};

  componentDidMount() {}

  render() {
    return (
      <Switch>

        {/* Renders components once application is loaded first time */}
        <Route path={urlPatterns.BASE} exact component={Home} />
        <Route path={urlPatterns.HOME} exact component={Home} />
        <Route path={urlPatterns.SIGN_UP} component={SignUp} />
        <Route path={urlPatterns.PASSWORD_RESET} component={PasswordReset} />
        <Route path={urlPatterns.SET_NEW_PASSWORD} component={SetNewPassword} />
        <Route path={urlPatterns.QUIZ} exact component={Quiz} />
        <Route path={urlPatterns.QUIZ_RESULTS} exact component={QuizResults} />
        <Route path={urlPatterns.GIFTS} exact component={Gifts} />
        <Route path={urlPatterns.REDEEM_GIFT} exact component={RedeemGift} />

        {/* Renders lazily loaded components --> https://reactjs.org/docs/code-splitting.html#reactlazy */}
        <Route path={urlPatterns.LOGIN} render={props => <Login {...props} />} />
        <Route path={urlPatterns.REFERRAL()} render={props => <Referral {...props} />} />
        <Route path={urlPatterns.WINES} exact render={props => <Wines {...props} />} />
        <Route
          path={urlPatterns.WINES_BOX}
          exact
          render={props => <Wines {...props} isWineSubscriptionBox />}
        />
        <Route path={urlPatterns.WINE_DETAILS()} render={props => <WineDetails {...props} />} />
        <Route path={urlPatterns.WINE_DETAILS_BY_ID()} render={props => <WineDetailsById {...props} />} />
        <Route path={urlPatterns.CHECKOUT} render={props => <Checkout {...props} />} />
        <Route path={urlPatterns.THANK_YOU} render={props => <ThankYou {...props} />} />
        <Route path={urlPatterns.SPECIAL_PACKS} exact render={props => <SpecialPacks {...props} />} />
        <Route
          path={urlPatterns.SPECIAL_PACK_DETAILS()}
          render={props => <SpecialPackDetails {...props} />}
          exact
        />
        <Route
          path={urlPatterns.FREE_BOX_CAMPAIGN()}
          render={props => <FreeBoxCampaign {...props} />}
          exact
        />

        <PrivateRoute path={urlPatterns.MY_ACCOUNT} component={MyAccount} exact />
        <PrivateRoute path={urlPatterns.DASHBOARD_BADGES} component={DashboardBadges} exact />
        <PrivateRoute path={urlPatterns.MY_ORDERS} component={MyOrders} exact />
        <PrivateRoute path={urlPatterns.DASHBOARD} component={Dashboard} exact />
        <PrivateRoute path={urlPatterns.RATINGS} component={WineRatings} exact />
        <PrivateRoute path={urlPatterns.INVITE_FRIEND} component={InviteFriend} exact />
        <PrivateRoute path={urlPatterns.GIVE_FREE_TRIAL} component={GiveFreeTrial} exact />

        <Route path="" exact component={Home} />
      </Switch>
    );
  }
}

export default Routes;
