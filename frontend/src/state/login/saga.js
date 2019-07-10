import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  SUBMIT_INFO_AND_FETCH_PROFILE,
  FETCH_CURRENT_PROFILE,
} from './constants';

import { fetchProfileSuccess } from './action';

export function* submitInfoForAuthentication({ payload: { data } }) {
  const response = yield fetch('http://localhost:1515/api/auth', {
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
    yield put(push('/homepage'));
  } else {
    console.log('Incorrect username and/or password');
    return;
  }
}

export function* fetchCurrentProfile() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const response = yield fetch('api/user', {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
    if (response.ok) {
      const responseData = yield response.json();
      yield put(fetchProfileSuccess(responseData));
    }
  } catch (e) {
    console.log('Error in current user fetching: ', e);
    return;
  }
}

export default function* saga() {
  yield takeLatest(SUBMIT_INFO_AND_FETCH_PROFILE, submitInfoForAuthentication);
  yield takeEvery(FETCH_CURRENT_PROFILE, fetchCurrentProfile);
}
