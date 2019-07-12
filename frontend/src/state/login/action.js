import {
  SUBMIT_INFO_AND_FETCH_PROFILE,
  SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS,
  FETCH_CURRENT_PROFILE,
  FETCH_CURRENT_PROFILE_FAILURE,
  LOGOUT_USER,
} from './constants';

export function submitLoginInfo(data) {
  return { type: SUBMIT_INFO_AND_FETCH_PROFILE, payload: { data } };
}

export function fetchProfileSuccess(data) {
  return { type: SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS, payload: { data } };
}

export function fetchCurrentUserProfile() {
  return { type: FETCH_CURRENT_PROFILE };
}

export function fetchProfileFailure(error) {
  return { type: FETCH_CURRENT_PROFILE_FAILURE, payload: { error } };
}

export function logout() {
  console.log('logout intitiate');

  return { type: LOGOUT_USER };
}
