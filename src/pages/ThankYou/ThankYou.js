import React, { Component } from 'react';

import { trackEvent, trackingEvents } from '../../helpers/Analytics';

import './ThankYou.scss';

const THANK_YOU_PAGE_IMAGE = (
  `${process.env.REACT_APP_STATIC_URL}/site/img/wine-adventure-started.png`
);

/**
 * Renders ThankYou component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class ThankYou extends Component {
  static propTypes = {};

  static contextTypes = {};

  componentDidMount() {
    const { props } = this;

    const data = props.location.state.checkout;

    // TODO [DEV-160] change to "trackDuplicateJsEvent" method for sending data to facebook pixel
    trackEvent(trackingEvents.TRACKING_EVENT_PLACED_ORDER, data);
  }

  render() {

    return (
      <div className="ThankYou">
        <div className="ThankYou--container">
          <h1 className="ThankYou--title">CONGRATULATIONS!</h1>
          <h2>You have just taken your next step to discovering great bottles of wine...</h2>
          <img src={THANK_YOU_PAGE_IMAGE} alt="thank your for the purchase" />
          <button type="button" onClick={() => alert('Sorry not available yet :( ')}>
            Invite your best buds
          </button>
        </div>
      </div>
    );
  }
}

export default ThankYou;
