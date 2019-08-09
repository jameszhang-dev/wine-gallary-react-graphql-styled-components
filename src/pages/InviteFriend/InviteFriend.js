import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';

import {
  InputFieldCopyClipboard,
  SocialShare,
  InputField,
  ButtonMutation,
} from '../../components';
import { GET_MEMBER } from '../../graphql/queries';
import { INVITE_FRIEND } from '../../graphql/mutations';

import inviteFriendGlasses from '../../assets/images/invite-friend-glasses.png';
import './InviteFriend.scss';
import { SOCIAL_MEDIA_SITES } from '../../helpers/constants';

/**
 * Renders InviteFriend component which will provide different ways of inviting friends.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class InviteFriend extends Component {
  static propTypes = {
    meQuery: PropTypes.shape({}).isRequired,
  };

  state = {
    email: '',
    isInvited: false,
  };

  /**
   * Handles response from inviteFriend mutation to show successful message, if mutation was sent successfully
   * @param response
   * */
  handleResponseFriendInvitation = response => {
    if (response.data.inviteFriend) {
      this.setState({
        email: '',
        isInvited: response.data.inviteFriend.isSuccessful,
      });
    }
  };

  render() {
    const { meQuery } = this.props;
    const { email, isInvited } = this.state;

    if (meQuery.loading || !meQuery.me) return <div>Loading...</div>;
    const url = `${process.env.REACT_APP_BASE_URL}/invite/${meQuery.me.referralCode}`;
    return (
      <div className="InviteFriend">
        <div className="InviteFriend--container">
          <section className="InviteFriend--title">
            <h1>Invite your friends to take their very own wine journey.</h1>
            <p>
              You will get a free bottle for every friend that signs up using your code.
              <br />
              And they will also get their first bottle free. Everybody win(e)s!
            </p>
          </section>

          <section className="InviteFriend--content">
            <img src={inviteFriendGlasses} alt="Invite friends cheering" />
            <p>
              {`Share your personal code ${meQuery.me.referralCode} with friends or relatives, or just send
              them the link below:`}
            </p>
            <section className="InviteFriend--content">
              <InputFieldCopyClipboard
                text={url}
              />
            </section>

            <section className="InviteFriend--content social">
              <SocialShare socialMedia={SOCIAL_MEDIA_SITES.FACEBOOK} url={url} />
              <SocialShare socialMedia={SOCIAL_MEDIA_SITES.TWITTER} url={url} />
              <SocialShare socialMedia={SOCIAL_MEDIA_SITES.FACEBOOK_MESSENGER} url={url} />
            </section>

            <section className="InviteFriend--content">
              <p>OR...</p>

              <InputField
                id="email"
                name="email"
                label="Let us send them an email with your link:"
                value={email}
                onChange={(field, value) => this.setState({ [field]: value })}
              />
              {isInvited && <div>Invitation sent successfully!</div>}
              <ButtonMutation
                input={{ email, memberId: meQuery.me.id }}
                label="Invite By Email"
                mutationProp={INVITE_FRIEND}
                handleResponse={this.handleResponseFriendInvitation}
              />
            </section>

          </section>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(GET_MEMBER, { name: 'meQuery' }),
)(InviteFriend);
