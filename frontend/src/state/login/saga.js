/* eslint-disable no-console */
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import API from 'utils/api';

import {
  SUBMIT_INFO_AND_FETCH_PROFILE,
  FETCH_CURRENT_PROFILE,
} from './constants';

import { fetchProfileSuccess, fetchProfileFailure } from './action';

export function* submitInfoForAuthentication({ payload: { data } }) {
  const response = yield fetch('/api/auth', {
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data.toJS()),
  });

  if (response.ok) {
    const responseData = yield response.json();

    localStorage.setItem('token', responseData.token);
    yield put(fetchProfileSuccess(responseData));
    yield put(push('/'));
    window.location.reload();
  } else {
    console.log('Incorrect username and/or password');
    return;
  }
}

export function* fetchCurrentProfile() {
  try {
    const response = yield call(API.get, 'api/user');

    yield put(fetchProfileSuccess(response));
  } catch (error) {
    console.log('Error in fetchCurrentProfile: ', error);
    yield put(fetchProfileFailure(error));
  }
}

export default function* saga() {
  yield takeLatest(SUBMIT_INFO_AND_FETCH_PROFILE, submitInfoForAuthentication);
  yield takeEvery(FETCH_CURRENT_PROFILE, fetchCurrentProfile);
}
