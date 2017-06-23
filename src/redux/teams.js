import * as ActionTypes from '../ActionTypes';

const requestTeams = () => {
  return {
    type: ActionTypes.FETCH_TEAMS_REQUEST,
    isFetching: true,
  };
};

const receiveTeams = (result) => {
  return {
    type: ActionTypes.FETCH_TEAMS_SUCCESS,
    isFetching: false,
    result: result,
  }
};

const teamsError = (message) => {
  return {
    type: ActionTypes.FETCH_TEAMS_SUCCESS,
    isFetching: false,
    message
  }
};

export const fetchTeams = () => {
  return function (dispatch) {
    dispatch(requestTeams());

    return (async() => {
      try {
        const response = await fetch('http://localhost:3000/teams');

        if (response.status === 200) {
          const data = await response.json();

          dispatch(receiveTeams(data));
        } else {
          dispatch(teamsError(data));
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    })();
  }
};
