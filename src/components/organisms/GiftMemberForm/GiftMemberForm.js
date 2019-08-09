import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';

import { InputField } from '../..';
import { GET_GIFT_FLOW_INFO, SET_GIFT_FLOW_INFO } from '../../../graphql/resolvers/gift';
import { FETCH_POLICY_CACHE_ONLY } from '../../../helpers/constants';
import { checkEmail, checkName, checkServerValidation } from '../../../helpers/validations';

import './GiftMemberForm.scss';

/**
 * Renders GiftMemberForm component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class GiftMemberForm extends Component {
  static propTypes = {};

  state = {
    validation: {},
    showHoldUntilDate: false,
  };

  handleShowHoldUntilDate = () => {
    const { showHoldUntilDate } = this.state;

    if (showHoldUntilDate) {
      this.handleChange('holdUntilDate', null);
    }
    this.setState({
      showHoldUntilDate: !showHoldUntilDate,
    });
  };

  /**
   * Assigns new values to 'this.state.form' properties
   * @param value
   * @param field
   * */
  handleChange = async (field, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, [field]: value } });

    const { setGiftFlowInfo, giftFlowQuery } = this.props;
    await setGiftFlowInfo({
      variables: {
        ...giftFlowQuery.giftFlow,
        [field]: value,
      },
    });
  };

  render() {
    const { state, props } = this;
    const { giftFlowQuery } = props;
    const { validation, showHoldUntilDate } = state;
    const {
      toMemberFirstName,
      toMemberLastName,
      toMemberEmail,
      toMemberMobileCountryCode,
      toMemberMobileNumber,
      toMemberPersonalNote,
      holdUntilDate,
    } = giftFlowQuery.giftFlow;

    return (
      <div className="GiftMemberForm">
        <div className="GiftMemberForm--container">
          <h1 className="GiftMemberForm--forms__title">Recipient</h1>
          <div className="GiftMemberForm--forms__form">
            <InputField
              label="First Name"
              placeholder="First Name"
              name="toMemberFirstName"
              id="toMemberFirstName"
              type="text"
              value={toMemberFirstName}
              onChange={this.handleChange}
              validations={[checkName]}
              serverValidation={
                validation && checkServerValidation(validation, 'signUp', 'first_name')
              }
            />
            <InputField
              label="Last Name"
              placeholder="Last Name"
              name="toMemberLastName"
              id="toMemberLastName"
              type="text"
              value={toMemberLastName}
              onChange={this.handleChange}
              validations={[checkName]}
              serverValidation={
                validation && checkServerValidation(validation, 'signUp', 'to_member_last_name')
              }
            />
            <InputField
              label="Email"
              placeholder="Email"
              name="toMemberEmail"
              id="toMemberEmail"
              type="email"
              value={toMemberEmail}
              onChange={this.handleChange}
              validations={[checkEmail]}
              serverValidation={
                validation && checkServerValidation(validation, 'signUp', 'to_member_email')
              }
            />
            <InputField
              label="Country Code"
              placeholder="61"
              name="toMemberMobileCountryCode"
              id="toMemberMobileCountryCode"
              type="text"
              value={toMemberMobileCountryCode}
              onChange={this.handleChange}
            />
            <InputField
              label="Phone Number"
              placeholder="04123 123 123"
              name="toMemberMobileNumber"
              id="toMemberMobileNumber"
              type="text"
              value={toMemberMobileNumber}
              onChange={this.handleChange}
            />
            <InputField
              label="Personal Notes"
              placeholder="eg. Dear John Wine..."
              name="toMemberPersonalNote"
              id="toMemberPersonalNote"
              type="text"
              value={toMemberPersonalNote}
              onChange={this.handleChange}
            />
            {
              showHoldUntilDate && (
                <InputField
                  label="Hold until date"
                  placeholder=""
                  name="holdUntilDate"
                  id="holdUntilDate"
                  type="date"
                  value={holdUntilDate}
                  onChange={this.handleChange}
                />
              )
            }
            <button onClick={this.handleShowHoldUntilDate} type="button" className="button-link">
              {showHoldUntilDate ? 'Send it ASAP' : 'Do not dispatch it before a given date'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(SET_GIFT_FLOW_INFO, { name: 'setGiftFlowInfo' }),
  graphql(
    GET_GIFT_FLOW_INFO, {
      name: 'giftFlowQuery',
      options: { fetchPolicy: FETCH_POLICY_CACHE_ONLY },
    }
  ),
)(GiftMemberForm);
