import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  InputFieldCopyClipboard,
  SocialShare,
  InputField,
  ButtonMutation,
} from '../..';
import { SEND_GIVEAWAY_INVITE } from '../../../graphql/mutations';
import { SOCIAL_MEDIA_SITES } from '../../../helpers/constants';

import './GiveFreeTrialForm.scss';

/**
 * Renders component to allow a member to share one of his free-trial invites with their friends
 * via social-share or e-mail.
 * */
class GiveFreeTrialForm extends Component {

  static propTypes = {
    me: PropTypes.shape({}).isRequired,
    subscriptionGiveaway: PropTypes.shape({}).isRequired,
    counter: PropTypes.number.isRequired,
  };

  state = {
    email: '',
    isInvitationEmailSent: false,
    errorMessage: null,
  };

  /**
   * Handles changes in the email input.
   *
   * @param email
   * @param value
   * */
  handleChangeEmail = (email, value) => {
    this.setState({
      [email]: value,
      errorMessage: null,
      isInvitationEmailSent: false,
    });
  };

  /**
   * Sets errors from mutations.
   * */
  handleSetErrors = error => {
    this.setState({ errorMessage: error });
  };

  /**
   * Handles response from sendGiveawayInvite mutation to show successful message,
   * if mutation was sent successfully.
   *
   * @param response
   * */
  handleResponseInvitationEmail = response => {

    if (response.data.sendGiveawayInvite) {
      this.setState({
        isInvitationEmailSent: response.data.sendGiveawayInvite.isSuccessful,
      });

    }
  };

  render() {

    const { email, isInvitationEmailSent, errorMessage } = this.state;
    const { me, subscriptionGiveaway, counter } = this.props;

    return (

      <section className="GiveFreeTrialForm">

        <h3>
          {`Free Trial #${counter + 1}`}
        </h3>

        <section className="GiveFreeTrialForm--content">
          <InputFieldCopyClipboard
            text={subscriptionGiveaway.url}
          />
        </section>

        <section className="GiveFreeTrialForm--content social">
          <SocialShare socialMedia={SOCIAL_MEDIA_SITES.FACEBOOK} url={subscriptionGiveaway.url} />
          <SocialShare socialMedia={SOCIAL_MEDIA_SITES.TWITTER} url={subscriptionGiveaway.url} />
          <SocialShare
            socialMedia={SOCIAL_MEDIA_SITES.FACEBOOK_MESSENGER}
            url={subscriptionGiveaway.url}
          />
        </section>

        <section className="GiveFreeTrialForm--content">
          <p>OR...</p>

          <InputField
            id={`email-${counter}`}
            name="email"
            label="Let us send them an email with your link:"
            type="email"
            value={email}
            onChange={this.handleChangeEmail}
          />
          {isInvitationEmailSent && <div>Invitation sent successfully!</div>}
          {errorMessage && errorMessage}

          <ButtonMutation
            input={{ memberId: me.id, email, code: subscriptionGiveaway.code }}
            label="Invite Via Email"
            mutationProp={SEND_GIVEAWAY_INVITE}
            handleResponse={this.handleResponseInvitationEmail}
            handleShowErrors={this.handleSetErrors}
            mutationPayloadName="sendGiveawayInvite"
          />

        </section>

      </section>

    );
  }
}

export default GiveFreeTrialForm;
