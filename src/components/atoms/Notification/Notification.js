import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import notificationProcessor from '../../../helpers/notificationProcessor';

const StyledNotification = styled.div`
  display: flex;
  padding: 10px;
`;

const Notification = props => {

  const { notification } = props;
  const notificationAsHtml = notificationProcessor(
    notification.activityType.id, JSON.parse(notification.jsonData),
  );

  return (
    <StyledNotification>
      {notificationAsHtml}
    </StyledNotification>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    jsonData: PropTypes.string,
    activityType: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default Notification;
