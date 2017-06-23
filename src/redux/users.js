import * as ActionTypes from '../ActionTypes';

const requestUsers = () => {
  return {
    type: ActionTypes.FETCH_USERS_REQUEST,
    isFetching: true,
  };
};

const receiveUsers = (result) => {
  return {
    type: ActionTypes.FETCH_USERS_SUCCESS,
    isFetching: false,
    result: result,
  }
};

const usersError = (message) => {
  return {
    type: ActionTypes.FETCH_USERS_SUCCESS,
    isFetching: false,
    message
  }
};

export const fetchUsers = (params) => {
  return function (dispatch) {
    dispatch(requestUsers());

    const { team_id } = params || {};

    return (async() => {
      try {
        const response = await fetch(`http://1ecb0b45.ngrok.io/teams/${team_id}/users`);

        if (response.status === 200) {
          const data = await response.json();

          dispatch(receiveUsers(data));
        } else {
          dispatch(usersError(data));
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    })();
  }
};
