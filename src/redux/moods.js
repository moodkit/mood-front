import * as ActionTypes from '../ActionTypes';
import * as Config from '../Config';

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

export const fetchMoods = (team_id, user_id) => {
  return function (dispatch, getState) {
    dispatch(requestMoods());

    const dates = getState().dates.result;

    const start_date = dates[0];
    const end_date = dates[dates.length - 1];

    return (async() => {
      try {
        let params = "";
        if (team_id) {
            params += `&team_id=${team_id}`;
        }
        if (user_id) {
            params += `&user_id=${user_id}`;
        }
        const response = await fetch(Config.HOST + `/moods?start_date=${start_date}&end_date=${end_date}` + params);

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
    const user = getState().users.result.find(user => user.id === id);
    const mood = Object.assign({}, { timestamp, user } , obj);

    dispatch(adddMood(mood));
  }
};
