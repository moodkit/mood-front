import * as ActionTypes from '../ActionTypes';

const requestMoods = () => {
  return {
    type: ActionTypes.FETCH_MOODS_REQUEST,
    isFetching: true,
  };
};

const receiveMoods = (result) => {
  return {
    type: ActionTypes.FETCH_MOODS_SUCCESS,
    isFetching: false,
    result: result,
  }
};

const usersError = (message) => {
  return {
    type: ActionTypes.FETCH_MOODS_SUCCESS,
    isFetching: false,
    message
  }
};

const selectUser = (user_id) => {
  return {
    type: ActionTypes.SELECT_USER,
    selectedUser: user_id
  };
};

const selectTimestamp = (timestamp) => {
  return {
    type: ActionTypes.SELECT_TIMESTAMP,
    selectedTimestamp: timestamp
  };
};

const settProperty = (obj) => {
  return {
    type: ActionTypes.SET_PROPERTY,
    obj,
  };
};

const adddMood = (mood) => {
  return {
    type: ActionTypes.ADD_MOOD,
    mood,
  };
};

export const fetchMoods = () => {
  return function (dispatch) {
    dispatch(requestMoods());

    return (async() => {
      try {
        const response = await fetch(`http://localhost:3000/moods`);

        if (response.status === 200) {
          const data = await response.json();

          dispatch(receiveMoods(data));
        } else {
          dispatch(usersError(data));
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    })();
  }
};

export const setUser = (user_id) => {
  return function (dispatch) {
    dispatch(selectUser(user_id));
  }
};

export const setTimestamp = (timestamp) => {
  return function (dispatch) {
    dispatch(selectTimestamp(timestamp));
  }
};

export const setProperty = (obj) => {
  return function (dispatch) {
    dispatch(settProperty(obj));
  }
};

export const addMood = (obj) => {
  return function (dispatch, getState) {
    const timestamp = getState().moods.selectedTimestamp;
    const id = getState().moods.selectedUser;
    const mood = Object.assign({}, { timestamp, user: { id, name: 'Dave Li' } } , obj);

    dispatch(adddMood(mood));
  }
};
