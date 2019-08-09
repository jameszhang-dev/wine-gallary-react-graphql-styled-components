import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { CheckBox } from '../..';
import { CREATE_CONTACT_PREFERENCE, DELETE_CONTACT_PREFERENCE } from '../../../graphql/mutations';
import { GET_MEMBER } from '../../../graphql/queries';
import {
  CONTACT_METHOD_ID_TO_ENUM,
  CONTACT_TYPE_ID_TO_ENUM,
} from '../../../helpers/constants';

import './ContactPreferencesForm.scss';

const CONTACT_METHODS = new Map([
  [1, 'email'],
  [2, 'sms'],
]);

const CONTACT_TYPES = new Map([
  [1, 'monthlyWineSelection'],
  [2, 'deliveryNotifications'],
  [3, 'badgesPointsRewards'],
  [4, 'socialConnectionsComments'],
  [5, 'newslettersArticlesSpecialOffers'],
]);

/**
 * Renders ContactPreferencesForm component.
 * React.Component: https://reactjs.org/docs/react-component.html
 * */
class ContactPreferencesForm extends Component {
  static propTypes = {
    contactPreference: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    memberId: PropTypes.number.isRequired,
  };

  state = {
    contactPreferencesForm: {
      monthlyWineSelection: {
        email: false,
        sms: false,
      },
      deliveryNotifications: {
        email: false,
        sms: false,
      },
      badgesPointsRewards: {
        email: false,
        sms: false,
      },
      socialConnectionsComments: {
        email: false,
        sms: false,
      },
      newslettersArticlesSpecialOffers: {
        email: false,
        sms: false,
      },
    },
  };

  componentDidMount() {
    const { props } = this;
    const preferencesArray = props.contactPreference && this.getContactPreferences();

    // Ensures that he UI has the latest information on component mounted
    this.setContactPreferences(preferencesArray);
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    // Ensures that the UI is updated when user changes the state
    if (prevProps !== props) {
      const preferencesArray = props.contactPreference && this.getContactPreferences();
      this.setContactPreferences(preferencesArray);
    }
  }

  /**
   * Handle check and uncheck input from interaction from user and formats the data to be stored in the state
   * @param preference: string
   * @param checked: contact preference ID
   * */
  handleChangeContactPreference = (preference, checked) => {
    const preferenceArray = preference.split('.');
    const type = preferenceArray[0];
    const method = preferenceArray[1];
    this.setContactPreferencesToState(type, method, checked);
  };

  /**
   * Gets input object to be sent ot mutation, based on the state of the checkbox (checked or unchecked)
   * @param inputObject: Object
   * @return {Object}
   * */
  getMutationVariables = inputObject => {
    const { memberId } = this.props;
    if (inputObject.id) {
      return ({
        input: {
          memberId,
          id: inputObject.id,
        },
      });
    }
    return ({
      input: {
        memberId,
        contactTypeId: inputObject.contactTypeId,
        contactMethodId: inputObject.contactMethodId,
      },
    });
  };

  /**
   * Gets array of objects from props to change format and populate on state
   * @return {Object[]}
   * */
  getContactPreferences = () => {
    const { props } = this;
    return props.contactPreference.map(
      preference => ({
        method: preference.contactMethod.id,
        type: preference.contactType.id,
        id: preference.id,
      })
    );
  };

  /**
   * Transforms data received from props on the format to be saved in state
   * @param preferencesArray
   * */
  setContactPreferences = preferencesArray => {
    preferencesArray.map(preferencesArrayItem => {
      const methodItem = CONTACT_METHODS.get(preferencesArrayItem.method);
      const typeItem = CONTACT_TYPES.get(preferencesArrayItem.type);
      const preferenceId = preferencesArrayItem.id;
      this.setContactPreferencesToState(typeItem, methodItem, preferenceId);
      return { methodItem, typeItem };
    });
  };

  /**
   * Stores data in local state received from:
   * 1. props (setContactPreferences())
   * 2. user interaction (handleChangeContactPreference())
   *
   * @param type
   * @param method
   * @param checked
   * */
  setContactPreferencesToState = (type, method, checked) => {
    const { state } = this;
    const { contactPreferencesForm } = state;
    const contactPreferenceFormConst = { ...contactPreferencesForm };
    contactPreferenceFormConst[type][method] = checked;
    this.setState({
      contactPreferencesForm: {
        ...contactPreferenceFormConst,
      },
    });
  };

  render() {
    const { contactPreferencesForm } = this.state;

    return (

      <div className="ContactPreferencesForm">
        <div className="ContactPreferencesForm--form">
          <h2>My Contact Preferences</h2>
          <CheckBox
            label="Monthly wine selection Email"
            id="monthlyWineSelection.email"
            checked={contactPreferencesForm.monthlyWineSelection.email}
            onChange={this.handleChangeContactPreference}
            query={GET_MEMBER}
            mutationVariables={this.getMutationVariables({
              id: contactPreferencesForm.monthlyWineSelection.email,
              contactTypeId: CONTACT_TYPE_ID_TO_ENUM.get(1),
              contactMethodId: CONTACT_METHOD_ID_TO_ENUM.get(1),
            })}
            mutation={
              contactPreferencesForm.monthlyWineSelection.email
                ? DELETE_CONTACT_PREFERENCE
                : CREATE_CONTACT_PREFERENCE
            }
          />
          <CheckBox
            label="Monthly wine selection SMS"
            id="monthlyWineSelection.sms"
            checked={contactPreferencesForm.monthlyWineSelection.sms}
            onChange={this.handleChangeContactPreference}
            query={GET_MEMBER}
            mutationVariables={this.getMutationVariables({
              id: contactPreferencesForm.monthlyWineSelection.sms,
              contactTypeId: CONTACT_TYPE_ID_TO_ENUM.get(1),
              contactMethodId: CONTACT_METHOD_ID_TO_ENUM.get(2),
            })}
            mutation={
              contactPreferencesForm.monthlyWineSelection.sms
                ? DELETE_CONTACT_PREFERENCE
                : CREATE_CONTACT_PREFERENCE
            }
          />
          <CheckBox
            label="Social Connections Comments Email"
            id="socialConnectionsComments.email"
            checked={contactPreferencesForm.socialConnectionsComments.email}
            onChange={this.handleChangeContactPreference}
            query={GET_MEMBER}
            mutationVariables={this.getMutationVariables({
              id: contactPreferencesForm.socialConnectionsComments.email,
              contactTypeId: CONTACT_TYPE_ID_TO_ENUM.get(4),
              contactMethodId: CONTACT_METHOD_ID_TO_ENUM.get(1),
            })}
            mutation={
              contactPreferencesForm.socialConnectionsComments.email
                ? DELETE_CONTACT_PREFERENCE
                : CREATE_CONTACT_PREFERENCE
            }
          />
          <CheckBox
            label="Social Connections Comments SMS"
            id="socialConnectionsComments.sms"
            checked={contactPreferencesForm.socialConnectionsComments.sms}
            onChange={this.handleChangeContactPreference}
            query={GET_MEMBER}
            mutationVariables={this.getMutationVariables({
              id: contactPreferencesForm.socialConnectionsComments.sms,
              contactTypeId: CONTACT_TYPE_ID_TO_ENUM.get(4),
              contactMethodId: CONTACT_METHOD_ID_TO_ENUM.get(2),
            })}
            mutation={
              contactPreferencesForm.socialConnectionsComments.sms
                ? DELETE_CONTACT_PREFERENCE
                : CREATE_CONTACT_PREFERENCE
            }
          />
          <CheckBox
            label="Badges, points and rewards Email"
            id="badgesPointsRewards.email"
            checked={contactPreferencesForm.badgesPointsRewards.email}
            onChange={this.handleChangeContactPreference}
            query={GET_MEMBER}
            mutationVariables={this.getMutationVariables({
              id: contactPreferencesForm.badgesPointsRewards.email,
              contactTypeId: CONTACT_TYPE_ID_TO_ENUM.get(3),
              contactMethodId: CONTACT_METHOD_ID_TO_ENUM.get(1),
            })}
            mutation={
              contactPreferencesForm.badgesPointsRewards.email
                ? DELETE_CONTACT_PREFERENCE
                : CREATE_CONTACT_PREFERENCE
            }
          />
          <CheckBox
            label="Badges, points and rewards SMS"
            id="badgesPointsRewards.sms"
            checked={contactPreferencesForm.badgesPointsRewards.sms}
            onChange={this.handleChangeContactPreference}
            query={GET_MEMBER}
            mutationVariables={this.getMutationVariables({
              id: contactPreferencesForm.badgesPointsRewards.sms,
              contactTypeId: CONTACT_TYPE_ID_TO_ENUM.get(3),
              contactMethodId: CONTACT_METHOD_ID_TO_ENUM.get(2),
            })}
            mutation={
              contactPreferencesForm.badgesPointsRewards.sms
                ? DELETE_CONTACT_PREFERENCE
                : CREATE_CONTACT_PREFERENCE
            }
          />
          <CheckBox
            label="Delivery notifications Email"
            id="deliveryNotifications.email"
            checked={contactPreferencesForm.deliveryNotifications.email}
            onChange={this.handleChangeContactPreference}
            query={GET_MEMBER}
            mutationVariables={this.getMutationVariables({
              id: contactPreferencesForm.deliveryNotifications.email,
              contactTypeId: CONTACT_TYPE_ID_TO_ENUM.get(2),
              contactMethodId: CONTACT_METHOD_ID_TO_ENUM.get(1),
            })}
            mutation={
              contactPreferencesForm.deliveryNotifications.email
                ? DELETE_CONTACT_PREFERENCE
                : CREATE_CONTACT_PREFERENCE
            }
          />
          <CheckBox
            label="Delivery notifications SMS"
            id="deliveryNotifications.sms"
            checked={contactPreferencesForm.deliveryNotifications.sms}
            onChange={this.handleChangeContactPreference}
            query={GET_MEMBER}
            mutationVariables={this.getMutationVariables({
              id: contactPreferencesForm.deliveryNotifications.sms,
              contactTypeId: CONTACT_TYPE_ID_TO_ENUM.get(2),
              contactMethodId: CONTACT_METHOD_ID_TO_ENUM.get(2),
            })}
            mutation={
              contactPreferencesForm.deliveryNotifications.sms
                ? DELETE_CONTACT_PREFERENCE
                : CREATE_CONTACT_PREFERENCE
            }
          />
          <CheckBox
            label="Newsletters, articles and special offers Email"
            id="newslettersArticlesSpecialOffers.email"
            checked={contactPreferencesForm.newslettersArticlesSpecialOffers.email}
            onChange={this.handleChangeContactPreference}
            query={GET_MEMBER}
            mutationVariables={this.getMutationVariables({
              id: contactPreferencesForm.newslettersArticlesSpecialOffers.email,
              contactTypeId: CONTACT_TYPE_ID_TO_ENUM.get(5),
              contactMethodId: CONTACT_METHOD_ID_TO_ENUM.get(1),
            })}
            mutation={
              contactPreferencesForm.newslettersArticlesSpecialOffers.email
                ? DELETE_CONTACT_PREFERENCE
                : CREATE_CONTACT_PREFERENCE
            }
          />
          <CheckBox
            label="Newsletters, articles and special offers SMS"
            id="newslettersArticlesSpecialOffers.sms"
            checked={contactPreferencesForm.newslettersArticlesSpecialOffers.sms}
            onChange={this.handleChangeContactPreference}
            query={GET_MEMBER}
            mutationVariables={this.getMutationVariables({
              id: contactPreferencesForm.newslettersArticlesSpecialOffers.sms,
              contactTypeId: CONTACT_TYPE_ID_TO_ENUM.get(5),
              contactMethodId: CONTACT_METHOD_ID_TO_ENUM.get(2),
            })}
            mutation={
              contactPreferencesForm.newslettersArticlesSpecialOffers.sms
                ? DELETE_CONTACT_PREFERENCE
                : CREATE_CONTACT_PREFERENCE
            }
          />
        </div>
      </div>
    );
  }
}

export default ContactPreferencesForm;
