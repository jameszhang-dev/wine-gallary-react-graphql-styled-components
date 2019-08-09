import React, { Component } from 'react';

import styled from 'styled-components';
import { NotificationsModal } from '../..';

import alarmBell from '../../../assets/images/icons/alarm-bell.svg';

const StyledHeaderNotificationBtn = styled.button`
  display: inline-block;
  width: 15px;
  margin-right: 20px;
  flex-shrink: 0;
  border: none;
  padding: 0;
  background: transparent;
`;

const StyledHeaderNotificationBtnImage = styled.img`
  display: block;
  width: 100%;
`;

class NotificationButton extends Component {

  static propTypes = {};

  state = {
    showModal: false,
  };

  render() {
    const { showModal } = this.state;

    return (
      <StyledHeaderNotificationBtn>
        <StyledHeaderNotificationBtnImage
          src={alarmBell}
          alt="alarm bell"
          onClick={() => this.setState(prevState => ({ showModal: !prevState.showModal }))}
        />
        <NotificationsModal showModal={showModal} onClose={() => this.setState({ showModal: false })} />
      </StyledHeaderNotificationBtn>
    );
  }
}

export default NotificationButton;
