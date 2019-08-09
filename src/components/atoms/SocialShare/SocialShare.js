import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FacebookProvider, Share } from 'react-facebook';

import { SOCIAL_MEDIA_SITES } from '../../../helpers/constants';

import './SocialShare.scss';

/**
 * Renders SocialShare component which will provide a button for sharing posts in social media.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class SocialShare extends Component {
  static propTypes = {
    socialMedia: PropTypes.oneOf([
      SOCIAL_MEDIA_SITES.FACEBOOK,
      SOCIAL_MEDIA_SITES.FACEBOOK_MESSENGER,
      SOCIAL_MEDIA_SITES.TWITTER,
    ]).isRequired,
    url: PropTypes.string,
  };

  static defaultProps = {
    url: process.env.REACT_APP_BASE_URL,
  };

  handleClickOpenWindow = socialUrl => {
    const { url } = this.props;
    window.open(
      `${socialUrl}${url}`,
      'contestrules',
      'menubar=0,resizable=0,width=450,height=350'
    );
  };

  render() {
    const { socialMedia, url } = this.props;
    const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
    const twitterBaseUrl = (
      'https://twitter.com/intent/tweet?text=Check%20this%20out&url='
    );
    const facebookMessengerBaseUrl = (
      `fb-messenger://share?app_id=${encodeURIComponent(facebookAppId)}&link=`
    );

    // Renders social media button based on different social media options
    switch (socialMedia) {
      case SOCIAL_MEDIA_SITES.FACEBOOK:
        return (
          <div className="SocialShare">
            <div className="facebook">
              <FacebookProvider appId={facebookAppId}>
                <Share href={url}>
                  {({ handleClick, loading }) => (
                    <button type="button" disabled={loading} onClick={handleClick}>
                      Facebook share
                    </button>
                  )}
                </Share>
              </FacebookProvider>
            </div>
          </div>
        );

      case SOCIAL_MEDIA_SITES.TWITTER:
        return (
          <div className="SocialShare">
            <div className="twitter">
              <button type="button" onClick={() => this.handleClickOpenWindow(twitterBaseUrl)}>
                Twitter share
              </button>
            </div>
          </div>
        );

      case SOCIAL_MEDIA_SITES.FACEBOOK_MESSENGER:
        return (
          <div className="SocialShare">
            <div className="facebook-messenger">
              <button type="button" onClick={() => this.handleClickOpenWindow(facebookMessengerBaseUrl)}>
                Facebook Messenger share
              </button>
            </div>
          </div>
        );

      default:
        return <div>Social media not chosen.</div>;
    }
  }
}

export default SocialShare;
