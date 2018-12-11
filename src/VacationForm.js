import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import VacationIndexItem from "./VacationIndexItem.js";

import "react-datepicker/dist/react-datepicker.css";

class VacationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userId: "",
      startDate: new Date(),
      endDate: new Date(),
      vacations: [],
      vacationCount: 0,
      isInvalidDate: false
    };

    this.editVacation = this.editVacation.bind(this);
    this.deleteVacation = this.deleteVacation.bind(this);
  }

  // TODO: USE REFS INSTEAD OF TRYING THIS...
  componentWillReceiveProps(nextProps) {
    // const { users } = this.state;
    
    // let isEqual = true;
    // nextProps.users.forEach((user, idx) => {
    //   if (JSON.stringify(user) !== JSON.stringify(users[idx])) {
    //     isEqual = false;
    //     debugger;
    //   }
    // });

    // if (!isEqual) {
    //   this.setState({users: nextProps.users});
    // }
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

  updateEndDate(date) {
    return date => {
      this.setState({
        endDate: date
      });
    }
  }

  handleSubmit() {
    return e => {
      e.preventDefault();
      let { userId, startDate, endDate, vacations, vacationCount } = this.state;

      if (startDate < endDate) {
        const newVacation = {
          id: ++vacationCount,
          userId,
          startDate,
          endDate
        };

        vacations.push(newVacation);
        this.setState({
          vacationCount,
          vacations,
          userId: "",
          startDate: new Date(),
          endDate: new Date(),
          isInvalidDate: false
        });
      } else {
        this.setState({ isInvalidDate: true });
      }
    };
  }

  editVacation(newVacation) {
    const { vacations } = this.state;
    const index = vacations.findIndex(vacation => {
      return vacation.id === newVacation.id;
    });
    if (index > -1) {
      vacations[index] = newVacation;
    }

    this.setState({vacations});
  }

  deleteVacation(id) { // Doesn't always work???????
    const { vacations } = this.state;
    const index = vacations.findIndex(vacation => {
      return vacation.id === id;
    });
    if (index > -1) {
      vacations.splice(index, 1);
    }
    this.setState({
      vacations
    });
  }

  render() {
    const {userId, startDate, endDate, vacations, isInvalidDate } = this.state;

    return (
      <div>
        <h2>Vacations</h2>
        <div className="red">{ isInvalidDate? "Invalid Dates" : "" }</div>
        <form onSubmit={this.handleSubmit()}>
          <select value={userId} onChange={this.update("userId")} required>
            <option value="">Select User</option>
            {
              this.props.users.map(user => (
                <option value={user.id} key={user.id}>{user.firstName + " " + user.lastName}</option>
              ))
            }
          </select>
          <DatePicker selected={startDate} onChange={this.updateStartDate()} />
          <DatePicker selected={endDate} onChange={this.updateEndDate()} />
          <input type="submit" value="Add" />
        </form>
        <div>
          <div>
            <div>
              <div className="table-header">User</div>
              <div className="table-header">Start Date</div>
              <div className="table-header">End Date</div>
            </div>
          </div>
          <div>
            { vacations.map(vacation => (
              <VacationIndexItem vacation={vacation} users={this.props.users} editVacation={this.editVacation} deleteVacation={this.deleteVacation} key={vacation.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default VacationForm;
