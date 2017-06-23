import { combineReducers } from 'redux';
import dates from '../reducers/dates';
import moods from '../reducers/moods';
import teams from '../reducers/teams';
import users from '../reducers/users';

const rootReducer = combineReducers({
  dates,
  moods,
  teams,
  users,
});

export default rootReducer;
