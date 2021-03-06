import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
  CLEAR_SEARCH
} from "./types";

// export const getLogs = () => {
//   return async dispatch => {
//     setLoading();
//     const res = await fetch("./logs");
//     const data = await res.json();

//     dispatch({
//       type: GET_LOGS,
//       payload: data
//     });
//   };
// };

//Get logs from server
export const getLogs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch("/api/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};

//Add new log
export const addLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch("/api/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};

//Delete log from server
export const deleteLog = id => async dispatch => {
  try {
    setLoading();
    await fetch(`/api/logs/${id}`, {
      method: "DELETE"
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};

//Update log on server
export const updateLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`/api/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};

//Set current log
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

//Search server logs
export const searchLogs = text => {
  setLoading();
  return {
    type: SEARCH_LOGS,
    payload: text
  };
};

//Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

//Clear search field
export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH
  };
};
//Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
