import React, { Component } from 'react';
import './App.css';
import DatePicker from "react-datepicker";
import UserIndexItem from "./UserIndexItem.js";
import VacationForm from "./VacationForm.js";

import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      firstName: "",
      lastName: "",
      role: "",
      startDate: new Date(),
      userCount: 0
    };

    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  updateStartDate(date) {
    return date => {
      this.setState({
        startDate: date
      });
    }
  }

  handleSubmit() {
    return e => {
      e.preventDefault();
      let { users, firstName, lastName, role, startDate, userCount } = this.state;
      const newUser = {
        id: ++userCount,
        firstName,
        lastName,
        role,
        startDate
      };

      users.push(newUser);
      this.setState({
        userCount,
        users,
        firstName: "",
        lastName: "",
        role: "",
        startDate: new Date(),
      });
    };
  }

  editUser(newUser) {
    const { users } = this.state;
    const index = users.findIndex(user => {
      return user.id === newUser.id;
    });
    if (index > -1) {
      users[index] = newUser;
    }

    this.setState({users});
  }

  deleteUser(id) { // Doesn't always work???????
    const { users } = this.state;
    const index = users.findIndex(user => {
      return user.id === id;
    });
    if (index > -1) {
      users.splice(index, 1);
    }
    this.setState({
      users
    });
  }

  render() {
    const { users, firstName, lastName, role, startDate } = this.state;

    return (
      <div className="App">
        <h2>Lean Data App</h2>
        <form id="new-user-form" onSubmit={this.handleSubmit()}>
          <input type="text" placeholder="First Name" value={firstName} onChange={this.update("firstName")} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={this.update("lastName")} required />
          <select value={role} onChange={this.update("role")} required>
            <option value="">Select Role</option>
            <option value="CEO">CEO</option>
            <option value="Engineer">Engineer</option>
            <option value="QA">QA</option>
            <option value="Sales">Sales</option>
          </select>
          <DatePicker selected={startDate} onChange={this.updateStartDate()} />
          <input type="submit" value="Add" />
        </form>
        <div>
          <div>
            <div>
              <div className="table-header">First Name</div>
              <div className="table-header">Last Name</div>
              <div className="table-header">Role</div>
              <div className="table-header">Start Date</div>
            </div>
          </div>
          <div>
            { users.map(user => (
              <UserIndexItem user={user} editUser={this.editUser} deleteUser={this.deleteUser} key={user.id} />
            ))}
          </div>
        </div>
        <VacationForm users={users}/>
      </div>
    );
  }
}

export default App;
