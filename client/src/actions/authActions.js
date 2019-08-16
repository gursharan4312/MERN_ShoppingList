import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Regester User
export const register = ({ name, email, password }) => dispatch => {
  // headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  //body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAIL });
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
    });
};

//logout
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// setup config/headers and token
export const tokenConfig = getState => {
  // get token from local storage
  const token = getState().auth.state;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //If token, add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
