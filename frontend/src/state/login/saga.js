import { call, put, takeLatest } from 'redux-saga/effects';

import API from '../../utils/api';

import { SUBMIT_INFO_AND_FETCH_PROFILE } from './constants';

export function* submitInfoForAuthentication({ payload: { data } }) {
  console.log('submitted here', data);
  try {
    const profile = yield call(API.post, 'auth', data);
    console.log('Profile ', profile);
  } catch (error) {
    console.log('Error in profile saga: ', error);
  }
}

export default function* saga() {
  yield takeLatest(SUBMIT_INFO_AND_FETCH_PROFILE, submitInfoForAuthentication);
}
