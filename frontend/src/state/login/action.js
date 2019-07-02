import {
  SUBMIT_INFO_AND_FETCH_PROFILE,
  SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS,
} from './constants';

export function submitLoginInfo(data) {
  return { type: SUBMIT_INFO_AND_FETCH_PROFILE, payload: { data } };
}

export function fetchProfileSuccess(data) {
  return { type: SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS, payload: { data } };
}
