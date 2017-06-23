// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchTeams } from '../../redux/teams';

const mapStateToProps = (state) => {
  return {
    teams: state.teams.result,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchTeams }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class TeamsList extends Component {
  componentDidMount() {
    this.props.fetchTeams();
  }

  render() {
    return (
      <div className="container">
        {this.props.teams.map((y, i) =>
          <div key={y.id}>
            <Link to={{ pathname: `teams/${y.id}/moods` }}>{y.name}</Link>
          </div>
        )}
      </div>
    );
  }
}
