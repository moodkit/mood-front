import * as ActionTypes from '../ActionTypes';
import { daysOfTheWeek } from '../utils/days';

const requestdates = () => {
  return {
    type: ActionTypes.FETCH_DATES_REQUEST,
    isFetching: true,
  };
};

const receivedates = (result) => {
  return {
    type: ActionTypes.FETCH_DATES_SUCCESS,
    isFetching: false,
    result: result,
  }
};

const datesError = (message) => {
  return {
    type: ActionTypes.FETCH_DATES_SUCCESS,
    isFetching: false,
    message
  }
};

export const setDates = () => {
  return function(dispatch) {
    dispatch(requestdates());

    try {
      const dates = daysOfTheWeek();

      dispatch(receivedates(dates));
    } catch (error) {
      dispatch(datesError('Error!'));
    }
  }
};
