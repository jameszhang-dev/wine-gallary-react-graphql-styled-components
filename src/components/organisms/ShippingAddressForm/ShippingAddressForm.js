import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Mutation } from 'react-apollo';

import { GET_MEMBER } from '../../../graphql/queries';
import { UPDATE_MEMBER_SHIPPING_ADDRESS } from '../../../graphql/mutations';
import {
  checkAddress,
  checkName,
  checkServerValidation,
  checkState,
} from '../../../helpers/validations';
import { InputField } from '../..';

import './ShippingAddressForm.scss';

/**
 * Renders ShippingAddressForm that allows modifying Shipping Address details.
 * */
class ShippingAddressForm extends Component {

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
      id: PropTypes.number,
    }),
  };

  static defaultProps = {
    me: [{}],
  };

  state = {
    shippingAddressId: null,
    firstName: null,
    lastName: null,
    line1: null,
    line2: null,
    city: null,
    postCode: null,
    company: null,
    contactNumber: null,
    stateTerritory: null,
    countryId: null,
    addressUnavailableInstructionId: null,
  };

  componentDidMount() {
    const { props } = this;
    if (props.me.shippingAddress) this.handleQueryUpdate(props.me);
  }

  /**
   * Fills the state with values coming from props.
   *
   * @param {Object} query
   * */
  handleQueryUpdate = query => {
    const { state } = this;

    const initialShippingAddress = {
      shippingAddressId: query.shippingAddress.id || null,
      firstName: query.shippingAddress.firstName || null,
      lastName: query.shippingAddress.lastName || null,
      line1: query.shippingAddress.line1 || null,
      line2: query.shippingAddress.line2 || null,
      city: query.shippingAddress.city || null,
      stateTerritory: query.shippingAddress.state || null,
      postCode: query.shippingAddress.postcode || null,
      company: query.shippingAddress.company || null,
      contactNumber: query.shippingAddress.contactNumber || null,
      countryId: query.shippingAddress.country.id || null,
      addressUnavailableInstructionId: parseInt(
        query.shippingAddress.addressUnavailableInstruction.id, 10
      ) || null,
    };

    this.setState({ ...state, ...initialShippingAddress });
  };

  /**
   * Handles changes from an input.
   *
   * @param {string} field
   * @param {*} value
   */
  handleChange = async (field, value) => {
    const { state } = this;
    this.setState({ ...state, [field]: value });
  };

  render() {
    const { state, props } = this;
    const { me } = props;

    return (
      <Mutation mutation={UPDATE_MEMBER_SHIPPING_ADDRESS} refetchQueries={() => [{ query: GET_MEMBER }]}>
        {(updateShippingAddress, { data, error }) => {
          if (error) {
            error.graphQLErrors.map(message => console.error('Non-friendly error message', message.message));
          }
          return (
            <div className="ShippingAddressForm">
              <div className="ShippingAddressForm--form">
                <h2>My Shipping Address</h2>
                <form onSubmit={e => {
                  e.preventDefault();
                  updateShippingAddress({
                    variables:
                      {
                        input: {
                          id: state.shippingAddressId,
                          memberId: me.id,
                          firstName: state.firstName,
                          lastName: state.lastName,
                          line1: state.line1,
                          line2: state.line2,
                          city: state.city,
                          postcode: state.postCode,
                          contactNumber: state.contactNumber,
                          countryId: parseInt(state.countryId, 10),
                          state: state.stateTerritory,
                          company: state.company,
                          addressUnavailableInstructionId: state.addressUnavailableInstructionId,
                        },
                      },
                  });
                }}
                >
                  <InputField
                    type="text"
                    label="First Name"
                    name="firstName"
                    id="firstName"
                    validations={[checkName]}
                    value={state.firstName}
                    onChange={this.handleChange}
                  />
                  <InputField
                    type="text"
                    label="Last Name"
                    name="lastName"
                    id="lastName"
                    value={state.lastName}
                    validations={[checkName]}
                    onChange={this.handleChange}
                  />
                  <InputField
                    type="text"
                    label="Address line 1"
                    name="line1"
                    id="line1"
                    value={state.line1}
                    validations={[checkAddress]}
                    onChange={this.handleChange}
                  />
                  <InputField
                    type="text"
                    label="Address line 2"
                    name="line2"
                    id="line2"
                    value={state.line2}
                    onChange={this.handleChange}
                  />
                  <InputField
                    type="text"
                    label="State"
                    name="stateTerritory"
                    id="stateTerritory"
                    validations={[checkState]}
                    value={state.stateTerritory}
                    onChange={this.handleChange}
                  />
                  <InputField
                    type="number"
                    label="Contact number"
                    name="contactNumber"
                    id="contactNumber"
                    value={state.contactNumber}
                    onChange={this.handleChange}
                    serverValidation={
                      data && checkServerValidation(data, 'updateMemberShippingAddress', 'contact_number')
                    }
                  />
                  <InputField
                    type="number"
                    label="Post code"
                    name="postCode"
                    id="postCode"
                    value={state.postCode}
                    onChange={this.handleChange}
                  />
                  <InputField
                    type="number"
                    label="Country"
                    name="countryId"
                    id="countryId"
                    value={state.countryId}
                    onChange={this.handleChange}
                    serverValidation={
                      data && checkServerValidation(data, 'updateMemberShippingAddress', 'countryId')
                    }
                  />
                  <InputField
                    type="text"
                    label="City"
                    name="city"
                    id="city"
                    value={state.city}
                    onChange={this.handleChange}
                    serverValidation={
                      data && checkServerValidation(data, 'updateMemberShippingAddress', 'city')
                    }
                  />
                  <InputField
                    type="text"
                    label="Company"
                    name="company"
                    id="company"
                    value={state.company}
                    onChange={this.handleChange}
                  />
                  <InputField
                    type="number"
                    label="Select Delivery Instructions"
                    name="addressUnavailableInstructionId"
                    id="addressUnavailableInstructionId"
                    value={state.addressUnavailableInstructionId}
                    onChange={this.handleChange}
                  />
                  <button type="submit">Update Shipping Address</button>
                </form>
              </div>
            </div>);
        }}
      </Mutation>
    );
  }
}

export default ShippingAddressForm;
