import * as ActionTypes from '../ActionTypes';

const initialState = {
  isFetching: false,
  selectedUser: 0,
  selectedTimestamp: 0,
  result: [],
  errorMessage: '',
};

const moods = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MOODS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case ActionTypes.FETCH_MOODS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        result: action.result,
      });
    case ActionTypes.FETCH_MOODS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      });
    case ActionTypes.SELECT_USER:
      return Object.assign({}, state, {
        selectedUser: action.selectedUser,
      });
    case ActionTypes.SELECT_TIMESTAMP:
      return Object.assign({}, state, {
        selectedTimestamp: action.selectedTimestamp,
      });
    case ActionTypes.SET_PROPERTY:
      return {
        ...state,
        result: state.result.map(mood => mood.timestamp === state.selectedTimestamp && mood.user.id === state.selectedUser ?
          Object.assign({}, mood, action.obj) :
          { ...mood }
        )
      };
    case ActionTypes.ADD_MOOD:
      return Object.assign({}, state, {
        result: state.result.concat(action.mood)
      });
    default:
      return state
  }
};

export default moods;
