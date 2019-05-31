import { FETCH_PROFILE } from './constants';

export function submitLoginInfo(data) {
  return { type: FETCH_PROFILE, payload: { data } };
}
