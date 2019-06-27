import { SUBMIT_INFO_AND_FETCH_PROFILE } from './constants';

export function submitLoginInfo(data) {
  console.log('data in action', data);
  return { type: SUBMIT_INFO_AND_FETCH_PROFILE, payload: { data } };
}
