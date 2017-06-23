import * as ActionTypes from '../ActionTypes';

const initialState = {
  isFetching: false,
  result: [],
  errorMessage: '',
};

const dates = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DATES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case ActionTypes.FETCH_DATES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.result,
      });
    case ActionTypes.FETCH_DATES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    default:
      return state
  }
};

export default dates;
