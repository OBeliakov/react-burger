import { API_BASE } from "../constants";
import {
  passwordResetRequest,
  passwordUpdateRequest,
  registerUserRequest,
  loginUserRequest,
  logOutRequest,
  getUserRequest,
  updateUserRequest,
} from "../../services/api";
import {
  TFormValues,
  TResetForm,
  TSignInForm,
  TUserForm,
} from "../../utils/types/types";
export const RESET_FORM_FAILED = "RESET_FORM_FAILED";
export const RESET_FORM_SUCCESS = "RESET_FORM_SUCCESS";
export const UPDATE_FORM_FAILED = "UPDATE_FORM_FAILED";
export const UPDATE_FORM_SUCCESS = "UPDATE_FORM_SUCCESS";
export const REGISTER_FORM_SUCCESS = "REGISTER_FORM_SUCCESS";
export const REGISTER_FORM_FAILED = "REGISTER_FORM_FAILED";
export const LOGIN_FORM_SUCCESS = "LOGIN_FORM_SUCCESS";
export const LOGIN_FORM_FAILED = "LOGIN_FORM_FAILED";
export const LOGOUT_FORM_SUCCESS = "LOGOUT_FORM_SUCCESS";
export const LOGOUT_FORM_FAILED = "LOGOUT_FORM_FAILED";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILED = "SET_USER_FAILED";
export const AUTH_CHECK = "AUTH_CHECK";

export const passwordReset = (url: string, email: string) => {
  return async function (dispatch: any) {
    passwordResetRequest(url, email)
      .then(() => {
        dispatch({
          type: RESET_FORM_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({ type: RESET_FORM_FAILED });
      });
  };
};

export const passwordUpdate = (url: string, form: TResetForm) => {
  return function (dispatch: any) {
    passwordUpdateRequest(url, form)
      .then(() => {
        dispatch({
          type: UPDATE_FORM_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({ type: UPDATE_FORM_FAILED });
      });
  };
};

export const registerUser = (url: string, form: TFormValues) => {
  return async function (dispatch: any) {
    registerUserRequest(url, form)
      .then((data) => {
        dispatch({
          type: REGISTER_FORM_SUCCESS,
          payload: data.user,
        });
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch({ type: SET_USER_SUCCESS, payload: data.user });
        dispatch({ type: AUTH_CHECK, payload: true });
      })
      .catch(() => {
        dispatch({ type: REGISTER_FORM_FAILED });
      });
  };
};

export const loginUser = (url: string, form: TSignInForm) => {
  return async function (dispatch: any) {
    loginUserRequest(url, form)
      .then((data) => {
        dispatch({
          type: LOGIN_FORM_SUCCESS,
          payload: data.user,
        });
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch({ type: SET_USER_SUCCESS, payload: data.user });
        dispatch({ type: AUTH_CHECK, payload: true });
      })
      .catch(() => {
        dispatch({ type: LOGIN_FORM_FAILED });
      });
  };
};

export const logOut = (url: string) => {
  return function (dispatch: any) {
    logOutRequest(url)
      .then(() => {
        dispatch({
          type: LOGOUT_FORM_SUCCESS,
          payload: null,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .catch(() => {
        dispatch({ type: LOGOUT_FORM_FAILED });
      });
  };
};

export const getUser = () => {
  return async function (dispatch: any) {
    getUserRequest(`${API_BASE}/auth/user`)
      .then((data) => {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: data.user,
        });
      })
      .catch(() => {
        dispatch({ type: SET_USER_FAILED });
      });
  };
};

export const checkUserAuth = () => {
  return (dispatch: any) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({ type: SET_USER_SUCCESS, payload: null });
        })
        .finally(() => {
          dispatch({ type: AUTH_CHECK, payload: true });
        });
    } else {
      dispatch({ type: AUTH_CHECK, payload: true });
    }
  };
};

export const updateUserData = (url: string, form: TUserForm) => {
  return async function (dispatch: any) {
    updateUserRequest(`${API_BASE}/auth/user`, form)
      .then((data) => {
        dispatch({
          type: SET_USER_SUCCESS,
          payload: data.user,
        });
        dispatch({ type: AUTH_CHECK, payload: true });
      })
      .catch(() => {
        dispatch({
          type: SET_USER_FAILED,
        });
      });
  };
};
