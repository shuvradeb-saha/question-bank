import {
  SUBMIT_INFO_AND_FETCH_PROFILE,
  SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS,
  FETCH_CURRENT_PROFILE,
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
