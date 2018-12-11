import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class UserIndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      firstName: "",
      lastName: "",
      role: "",
      startDate: new Date(),
      firstNameInput: "",
      lastNameInput: "",
      roleInput: "",
      startDateInput: new Date(),
      isEditing: false
    };
  }

  componentWillMount() {
    const { id, firstName, lastName, role, startDate } = this.props.user;
    this.setState({
      id,
      firstName,
      lastName,
      role,
      startDate,
      firstNameInput: firstName,
      lastNameInput: lastName,
      roleInput: role,
      startDateInput: startDate
    });
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  updateStartDateInput(date) {
    return date => {
      this.setState({
        startDateInput: date
      });
    }
  }

  handleSubmit() {
    return e => {
      e.preventDefault();
      const { firstNameInput, lastNameInput, roleInput, startDateInput } = this.state;
      const user = {...this.props.user, firstNameInput, lastNameInput, roleInput, startDateInput};

      this.props.editUser(user);
      this.setState({
        firstName: firstNameInput,
        lastName: lastNameInput,
        role: roleInput,
        startDate: startDateInput,
        isEditing: false
      });
    };
  }

  deleteUser() {
    return e => {
      this.props.deleteUser(this.state.id);
    }
  }

  toggleIsEditing() {
    return e => {
      e.preventDefault();
      const { firstName, lastName, role, startDate } = this.state;

      this.setState({
        isEditing: !this.state.isEditing,
        firstNameInput: firstName,
        lastNameInput: lastName,
        roleInput: role,
        startDateInput: startDate
      });
    }
  }

  renderEditform() {
    const { firstNameInput, lastNameInput, roleInput, startDateInput } = this.state;

    return (
      <form onSubmit={this.handleSubmit()}>
        <input type="text" placeholder="First Name" value={firstNameInput} onChange={this.update("firstNameInput")} required />
        <input type="text" placeholder="Last Name" value={lastNameInput} onChange={this.update("lastNameInput")} required />
        <select value={roleInput} onChange={this.update("roleInput")} required>
          <option value="">Select Role</option>
          <option value="CEO">CEO</option>
          <option value="Engineer">Engineer</option>
          <option value="QA">QA</option>
          <option value="Sales">Sales</option>
        </select>
        <DatePicker selected={startDateInput} onChange={this.updateStartDateInput()} />
        <input type="submit" value="Save" />
        <input type="button" onClick={this.toggleIsEditing()} value="Cancel" />
      </form>
    )
  }

  renderUserData() {
    const { firstName, lastName, role, startDate } = this.state;

    return (
      <div>
        <div className="user-input">{firstName}</div>
        <div className="user-input">{lastName}</div>
        <div className="user-input">{role}</div>
        <div className="user-input">{startDate.toDateString()}</div>
        <div className="user-input"><button onClick={this.toggleIsEditing()}>Edit</button></div>
        <div className="user-input"><button onClick={this.deleteUser()}>Delete</button></div>
      </div>
    )
  }

  render() {
    const { isEditing } = this.state;

    return (
      <div>
        { isEditing ? this.renderEditform() : this.renderUserData() }
      </div>
    );
  }
}

export default UserIndexItem;
