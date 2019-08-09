import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Modal from 'simple-react-modal';
import { ShippingPrePaidPlans } from '../..';
import urlPatterns from '../../../urls';

import './FreeShipping.scss';

/**
 * Renders FreeShipping component that presents available free-shipping options in a modal.
 * */
class FreeShipping extends Component {
  static propTypes = {
    navigateToCheckout: PropTypes.bool,
    history: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    navigateToCheckout: false,
  };

  state = {
    showModal: false,
  };

  onSuccessfulOperation = () => {
    const { navigateToCheckout, history } = this.props;
    this.setState({ showModal: false }, () => {
      navigateToCheckout && history.push(urlPatterns.CHECKOUT);
    });
  };

  render() {
    const { showModal } = this.state;
    const { navigateToCheckout } = this.props;

    return (
      <div className="FreeShipping">
        <span
          role="button"
          tabIndex="0"
          onKeyPress={() => this.setState({ showModal: !showModal })}
          onClick={() => this.setState({ showModal: !showModal })}
          className="FreeShipping--button"
        >
          view free shipping options
        </span>
        <Modal
          style={{ background: 'rgba(0, 0, 0, 0.2)' }}
          containerStyle={{ width: '80%', maxWidth: 600 }}
          show={showModal}
          onClose={() => this.setState({ showModal: false })}
          closeOnOuterClick
        >
          <ShippingPrePaidPlans
            navigateToCheckout={navigateToCheckout}
            callbackOnAdd={this.onSuccessfulOperation}
            callbackOnDelete={this.onSuccessfulOperation}
          />
          {/* TODO: [DEV-299] add SubscriptionPrePaidPlans */}
        </Modal>
      </div>
    );
  }
}

export default withRouter(FreeShipping);
