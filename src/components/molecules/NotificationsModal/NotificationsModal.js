import React from 'react';
import PropTypes from 'prop-types';

import { compose, graphql } from 'react-apollo';
import Modal from 'simple-react-modal';
import { Notification } from '../..';
import { GET_MEMBER } from '../../../graphql/queries';

const NotificationsModal = props => {

  const { showModal, meQuery, onClose } = props;

  return (
    <Modal
      style={{ background: 'rgba(0, 0, 0, 0.2)' }}
      containerStyle={{ width: '80%', maxWidth: 600 }}
      show={showModal}
      onClose={() => onClose()}
      closeOnOuterClick
    >
      <h3>Notifications</h3>
      {meQuery.loading && <div>Loading...</div>}
      {!meQuery.loading && meQuery.me && meQuery.me.recentNotifications.map(notification => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </Modal>
  );
};

NotificationsModal.propTypes = {
  meQuery: PropTypes.shape({}).isRequired,
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default compose(
  graphql(GET_MEMBER, { name: 'meQuery' }),
)(NotificationsModal);
