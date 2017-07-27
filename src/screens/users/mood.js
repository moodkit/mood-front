// React Hot Reload does not support stateless function components as of now
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Calendar } from 'antd';
import Emojify from 'react-emojione'
import { fetchUsers } from '../../redux/users';
import { fetchMoods } from '../../redux/moods';
import { setDates } from '../../redux/dates';
import moment from 'moment';

const mapStateToProps = (state) => {
  return {
    dates: state.dates.result,
    moods: state.moods.result,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ setDates, fetchMoods, fetchUsers }, dispatch);
let moodMap = {};

@connect(mapStateToProps, mapDispatchToProps)
export default class UsersMood extends Component {
  componentDidMount() {
    const { user_id } = this.props.router.params;

    this.props.setDates();
    this.props.fetchMoods(null, user_id);
    this.props.moods.forEach(mood => {
      console.log(mood);
      let moodDate = moment.unix(mood['timestamp']);
      let label = 'normal';
      switch (mood['value']) {
        case 3: label = 'warning'; break;
        case 4: label = 'warning'; break;
        case 5: label = 'error'; break;
        case 6: label = 'error'; break;
      }
      moodMap[moodDate.year()] = moodMap[moodDate.year()] || {};
      moodMap[moodDate.year()][moodDate.month()] = moodMap[moodDate.year()][moodDate.month()] || {};
      moodMap[moodDate.year()][moodDate.month()][moodDate.date()] = [{
        type: label,
        content: mood['label']
      }];
    });
  }

  render() {
    return (
      <Calendar dateCellRender={dateCellRender} />
    );
  }
}

function renderEmoji(value) {
  return <Emojify><span>{value}</span></Emojify>;
}

function getListData(value) {
  let listData;
  if (value.year() in moodMap && value.month() in moodMap[value.year()] && value.date() in
  moodMap[value.year()][value.month()]) {
    return moodMap[value.year()][value.month()][value.date()];
  }
  return [];
}

function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {
        listData.map(item => (
          <li key={item.content}>
            <span className={`event-${item.type}`}>●</span>
            {renderEmoji(item.content)}
          </li>
        ))
      }
    </ul>
  );
}


