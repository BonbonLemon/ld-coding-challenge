import React, { Component } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class VacationIndexItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      userId: 0,
      startDate: new Date(),
      endDate: new Date(),
      userIdInput: 0,
      startDateInput: new Date(),
      endDateInput: new Date(),
      isEditing: false,
      isInvalidDates: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { id, userId, startDate, endDate } = this.props.vacation;
    this.setState({
      id,
      userId,
      startDate,
      endDate,
      userIdInput: userId,
      startDateInput: startDate,
      endDateInput: endDate
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

  updateEndDateInput(date) {
    return date => {
      this.setState({
        endDateInput: date
      });
    }
  }

  handleSubmit() {
    return e => {
      e.preventDefault();
      const { userIdInput, startDateInput, endDateInput } = this.state;

      if (startDateInput < endDateInput) {
        const vacation = {...this.props.vacation, userIdInput, startDateInput, endDateInput};

        this.props.editVacation(vacation);
        this.setState({
          userId: userIdInput,
          startDate: startDateInput,
          endDate: endDateInput,
          isEditing: false,
          isInvalidDates: false
        });
      } else {
        this.setState({isInvalidDates: true});
      }
    };
  }

  deleteVacation() {
    return e => {
      this.props.deleteVacation(this.state.id);
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
        startDateInput: startDate,
        isInvalidDates: false
      });
    }
  }

  renderEditform() {
    const { userIdInput, startDateInput, endDateInput, isInvalidDates } = this.state;

    return (
      <form onSubmit={this.handleSubmit()}>
        <div className="red">{isInvalidDates ? "Invalid Dates" : ""}</div>
        <select value={userIdInput} onChange={this.update("userIdInput")} required>
            <option value="">Select User</option>
            {
              this.props.users.map(user => (
                <option value={user.id} key={user.id}>{user.firstName + " " + user.lastName}</option>
              ))
            }
          </select>
          <DatePicker selected={startDateInput} onChange={this.updateStartDateInput()} />
          <DatePicker selected={endDateInput} onChange={this.updateEndDateInput()} />
        <input type="submit" value="Save" />
        <input type="button" onClick={this.toggleIsEditing()} value="Cancel" />
      </form>
    )
  }

  renderVacationData() {
    const { userId, startDate, endDate } = this.state;
    const user = this.props.users.find(user => {
      return user.id === parseInt(userId);
    });

    return (
      <div>
        <div className="user-input">{user.firstName + " " + user.lastName}</div>
        <div className="user-input">{startDate.toDateString()}</div>
        <div className="user-input">{endDate.toDateString()}</div>
        <div className="user-input"><button onClick={this.toggleIsEditing()}>Edit</button></div>
        <div className="user-input"><button onClick={this.deleteVacation()}>Delete</button></div>
      </div>
    )
  }

  render() {
    const { isEditing } = this.state;

    return (
      <div>
        { isEditing ? this.renderEditform() : this.renderVacationData() }
      </div>
    );
  }
}

export default VacationIndexItem;
