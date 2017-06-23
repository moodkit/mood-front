// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchUsers } from '../../redux/users';

const mapStateToProps = (state) => {
  return {
    users: state.users.result,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUsers }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();

    console.log(this.props.users);
  }

  render() {
    return (
      <div>
        {this.props.users.map((y, i) =>
          <article key={y.id}>
            <p>Name: {y.name}</p>
            <p>Email: {y.email}</p>
            <p>Teams: {y.teams.join(', ')}</p>
          </article>
        )}
      </div>
    );
  }
}
