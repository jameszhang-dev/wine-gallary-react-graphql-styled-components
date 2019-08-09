import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { InputField, ButtonMutation } from '../..';
import { UPDATE_OR_CREATE_WINE_LIST } from '../../../graphql/mutations';
import { GET_MEMBER } from '../../../graphql/queries';

import './CreateWineList.scss';

/**
 * Renders a WineList item for the given member and wine with the option to add or remove.
 * */
class CreateWineList extends Component {

  static propTypes = {
    memberId: PropTypes.number.isRequired,
  };

  state = {
    showFormInput: false,
    newListName: '',
  };

  /**
   * Handles opening the form input to create a new list.
   * */
  handleOpenForm = () => {
    this.setState({ showFormInput: true });
  };

  /**
   * Handles response from the mutation to hide the form.
   * */
  handleResponse = () => {
    this.setState({
      showFormInput: false,
      newListName: '',
    });
  };

  /**
   * Assigns new value to 'this.state.newListName'
   *
   * @param value
   * @param field
   * */
  handleChange = (field, value) => {
    this.setState({ newListName: value });
  };

  render() {

    const { memberId } = this.props;
    const { newListName, showFormInput } = this.state;

    return (
      <div className="CreateWineList--container">
        {
          showFormInput
            ? (
              <div className="CreateWineList--form">
                <InputField
                  label="Name"
                  placeholder="e.g. my summer wines"
                  name="listName"
                  id="listName"
                  type="text"
                  value={newListName}
                  onChange={this.handleChange}
                />
                <ButtonMutation
                  input={{ memberId, name: newListName, isPublic: true }}
                  mutationProp={UPDATE_OR_CREATE_WINE_LIST}
                  reFetchQueriesProp={[{ query: GET_MEMBER }]}
                  label="save"
                  handleResponse={this.handleResponse}
                />
              </div>
            )

            : (<button type="button" onClick={this.handleOpenForm}>Create new list</button>)
        }
      </div>
    );
  }
}

export default CreateWineList;
