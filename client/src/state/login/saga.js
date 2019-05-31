import { call, put, takeLatest } from 'redux-saga/effects';

import API from '../../utils/api';

import { FETCH_PROFILE } from './constants';

export function* submitInfoForAuthentication({ payload: { data } }) {
  try {
    const profile = yield call(API.post, 'api/auth');
    console.log('Profile ', profile);
  } catch (error) {
    console.log('Error in profile saga: ', error);
  }
}

export default function* saga() {
  yield takeLatest(FETCH_PROFILE, submitInfoForAuthentication);
}
