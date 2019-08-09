import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  checkAddress,
  checkName,
} from '../../../helpers/validations';
import { AUSTRALIA_CODE, AU_STATES, ADDRESS_UNAVAILABLE_IDS } from '../../../helpers/constants';
import { InputField } from '../..';

import './CheckoutShippingAddressForm.scss';

/**
 * Renders CheckoutShippingAddressForm in a react component
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class CheckoutShippingAddressForm extends Component {
  static propTypes = {
    me: PropTypes.shape({
      shippingAddress: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        line1: PropTypes.string,
        line2: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        postcode: PropTypes.string,
        company: PropTypes.string,
        contactNumber: PropTypes.string,
        country: PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          code: PropTypes.bool,
        }),
        addressUnavailableInstruction: PropTypes.shape({
          id: PropTypes.number,
          nameShort: PropTypes.string,
          authorityToLeave: PropTypes.bool,
        }),
      }),
      email: PropTypes.string,
      id: PropTypes.number,
    }),
    isCheckoutPage: PropTypes.bool,
    handleShippingAddressChange: PropTypes.func,
  };

  static defaultProps = {
    me: [{}],
    isCheckoutPage: false,
    handleShippingAddressChange: null,
  };

  state = {
    isLoaded: false,
    shippingAddress: {
      shippingAddressId: null,
      firstName: null,
      lastName: null,
      line1: null,
      line2: null,
      city: null,
      state: '',
      postcode: null,
      company: null,
      contactNumber: null,
      countryId: AUSTRALIA_CODE,
      addressUnavailableInstructionId: '',
    },
  };

  async componentDidMount() {
    const { props } = this;
    if (props.me.shippingAddress) await this.handleQueryUpdate(props.me);

    this.setState({
      isLoaded: true,
    });
  }

  /**
   * Assigns new values to 'this.state.form' properties
   * @param {*} value
   * @param {string} field
   * */
  handleChange = async (field, value) => {
    const { shippingAddress } = this.state;
    const { handleShippingAddressChange } = this.props;
    this.setState({ shippingAddress: { ...shippingAddress, [field]: value } });

    // TODO: [DEV-203] Improve this when link state is introduced
    await handleShippingAddressChange({ ...shippingAddress, [field]: value });
  };

  /**
   * Handle changes on the select input fields
   * @param {Object} event
   * */
  handleChangeSelects = async event => {
    const { shippingAddress } = this.state;
    const { handleShippingAddressChange } = this.props;
    this.setState({ shippingAddress: { ...shippingAddress, [event.target.name]: event.target.value } });
    await handleShippingAddressChange({ ...shippingAddress, [event.target.name]: event.target.value });
  };

  /**
   * Handles component state updates
   * @param {Object} query
   * */
  handleQueryUpdate = query => {
    const { handleShippingAddressChange } = this.props;
    const shippingAddressUpdated = {
      shippingAddressId: query.shippingAddress.id || null,
      firstName: query.shippingAddress.firstName || null,
      lastName: query.shippingAddress.lastName || null,
      line1: query.shippingAddress.line1 || null,
      line2: query.shippingAddress.line2 || null,
      city: query.shippingAddress.city || null,
      state: query.shippingAddress.state || null,
      postcode: query.shippingAddress.postcode || null,
      company: query.shippingAddress.company || null,
      contactNumber: query.shippingAddress.contactNumber || null,
      countryId: query.shippingAddress.country.id || null,
      addressUnavailableInstructionId: parseInt(
        query.shippingAddress.addressUnavailableInstruction.id, 10
      ) || null,
    };

    this.setState({
      isLoaded: true,
      shippingAddress: { ...shippingAddressUpdated },
    });

    // TODO: [DEV-203] Improve this when link state is introduced
    handleShippingAddressChange({ ...shippingAddressUpdated });
  };

  /**
   * Rendering options for state select input
   * */
  renderStateOptions = () => {
    const options = [];
    options.push(<option key="default" value=" " defaultValue> - </option>);
    AU_STATES.forEach((value, key) => {
      options.push(<option key={value} value={value}>{key}</option>);
    });
    return options;
  };

  /**
   * Rendering options for addressUnavailableInstruction select input
   * */
  renderAddressUnavailableOptions = () => {
    const options = [];
    options.push(<option key="default" value=" " defaultValue> - </option>);
    ADDRESS_UNAVAILABLE_IDS.forEach((value, key) => {
      options.push(<option key={value} value={key}>{value}</option>);
    });
    return options;
  };

  render() {
    const { state } = this;
    const { isCheckoutPage } = this.props;

    if (!state.isLoaded) return <div>Loading...</div>;

    return (
      <div className="CheckoutShippingAddressForm">
        <div className="CheckoutShippingAddressForm--form">
          <h2>My Shipping Address</h2>
          <InputField
            type="text"
            label="First Name"
            name="firstName"
            id="firstName"
            validations={[checkName]}
            value={state.shippingAddress.firstName}
            onChange={this.handleChange}
          />
          <InputField
            type="text"
            label="Last Name"
            name="lastName"
            id="lastName"
            value={state.shippingAddress.lastName}
            validations={[checkName]}
            onChange={this.handleChange}
          />
          <InputField
            type="text"
            label="Address line 1"
            name="line1"
            id="line1"
            value={state.shippingAddress.line1}
            validations={[checkAddress]}
            onChange={this.handleChange}
          />
          <InputField
            type="text"
            label="Address line 2"
            name="line2"
            id="line2"
            value={state.shippingAddress.line2}
            onChange={this.handleChange}
          />

          {/* TODO Consider make a select input field atomic component */}
          {/* Eslint bug on select elements https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/477 */}
          <div className="input-select">
            <label // eslint-disable-line jsx-a11y/label-has-for
              htmlFor="state"
              id="labelForState"
            >
              State
              <select
                name="state"
                id="state"
                value={state.shippingAddress.state}
                onChange={event => this.handleChangeSelects(event)}
              >
                {this.renderStateOptions()}
              </select>
            </label>
          </div>

          <InputField
            type="number"
            label="Contact number"
            name="contactNumber"
            id="contactNumber"
            value={state.shippingAddress.contactNumber}
            onChange={this.handleChange}
          />
          <InputField
            type="number"
            label="Post code"
            name="postcode"
            id="postcode"
            value={state.shippingAddress.postcode}
            onChange={this.handleChange}
          />
          <InputField
            type="text"
            label="City"
            name="city"
            id="city"
            value={state.shippingAddress.city}
            onChange={this.handleChange}
          />
          <InputField
            type="text"
            label="Company"
            name="company"
            id="company"
            value={state.shippingAddress.company}
            onChange={this.handleChange}
          />

          {/* TODO Consider make a select input field atomic component */}
          {/* Eslint bug on select elements https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/477 */}
          <div className="input-select">
            <label // eslint-disable-line jsx-a11y/label-has-for
              htmlFor="addressUnavailableInstructionId"
              id="addressUnavailableInstructionId"
            >
              Select Delivery Instructions
              <select
                name="addressUnavailableInstructionId"
                id="addressUnavailableInstructionId"
                value={state.shippingAddress.addressUnavailableInstructionId}
                onChange={event => this.handleChangeSelects(event)}
              >
                {this.renderAddressUnavailableOptions()}
              </select>
            </label>
          </div>

          {

            // Form is submitted from Checkout component if checkout page
            !isCheckoutPage && (
              <button
                type="submit"
                onClick={this.handleSubmit}
              >
                Update Shipping Address
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

export default CheckoutShippingAddressForm;
