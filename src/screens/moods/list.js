// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Emojify from 'react-emojione'
import { Link } from 'react-router';

import { fetchMoods, setUser, setTimestamp, setProperty, addMood } from '../../redux/moods';
import { setDates } from '../../redux/dates';
import { fetchUsers } from '../../redux/users';

const mapStateToProps = (state) => {
  return {
    dates: state.dates.result,
    moods: state.moods.result,
    // users: getUsers(state),
    users: state.users.result,
    selectedUser: state.moods.selectedUser,
    selectedTimestamp: state.moods.selectedTimestamp,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ setDates, fetchMoods, setUser, setTimestamp, setProperty, addMood, fetchUsers }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class MoodsList extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.setEmoji = this.setEmoji.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.router.params;

    this.props.setDates();
    this.props.fetchUsers({team_id: id});
    this.props.fetchMoods(id);
  }

  renderCell(user, timestamp) {
    const result = this.props.moods.filter(mood => mood.timestamp === timestamp && user.id === mood.user.id).shift();

    return result && this.renderEmoji(result.label) || '';
  }

  renderEmoji(value) {
    return <Emojify><span>{value}</span></Emojify>;
  }

  // TODO: Move to grid?
  handleClick(e) {
    if (this.props.selectedUser && this.props.selectedTimestamp) {
      const element = document.querySelector(`[data-user-id="${this.props.selectedUser}"][data-timestamp="${this.props.selectedTimestamp}"]`);

      element.classList.remove('active');
    }

    const cell = e.target.closest('td');
    const { userId, timestamp } = cell.dataset;

    this.props.setUser(parseInt(userId, 10));
    this.props.setTimestamp(parseInt(timestamp, 10));

    cell.classList.add('active');
  }

  setEmoji(e) {
    if (this.props.selectedUser && this.props.selectedTimestamp) {
      const { label, value } = e.target.closest('[data-label][data-value]').dataset;

      const index = this.props.moods.findIndex(mood => mood.timestamp === this.props.selectedTimestamp && mood.user.id === this.props.selectedUser);

      index >= 0 ? this.props.setProperty({ label, value }) : this.props.addMood({ label, value })
    }
  }

  render() {
    return (
      <div className="container">
        <table className="table moods__table">
          <thead>
            <tr>
              <th>Week</th>
              {this.props.dates.map((y) =>
                <th key={y}>{ moment.unix(y).format('DD-MM-YYYY') }</th>
              )}
            </tr>
          </thead>
          <tbody>
          {this.props.users.map((user) =>
            <tr key={user.id}>
              <td><Link to={{ pathname: `/users/${user.id}/moods` }}>{user.name}</Link></td>
              {this.props.dates.map((timestamp) =>
                <td className="moods__cell--emoji" key={timestamp} data-user-id={user.id} data-timestamp={timestamp} onClick={this.handleClick}>{ this.renderCell(user, timestamp) } </td>
              )}
            </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}
