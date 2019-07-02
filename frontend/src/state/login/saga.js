import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { SUBMIT_INFO_AND_FETCH_PROFILE } from './constants';
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

  console.log('data ', data);

  let responseData;
  if (response.ok) {
    //localStorage.setItem('user_cred', fromJS(data));
    responseData = yield response.json();
    yield put(fetchProfileSuccess(responseData));
    yield put(push('/homepage'));
  } else {
    console.log('Incorrect username and/or password');
    return;
  }
}

export default function* saga() {
  yield takeLatest(SUBMIT_INFO_AND_FETCH_PROFILE, submitInfoForAuthentication);
}
