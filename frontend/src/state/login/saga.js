import { call, put, takeLatest } from 'redux-saga/effects';

import API from '../../utils/api';

import { SUBMIT_INFO_AND_FETCH_PROFILE } from './constants';

export function* submitInfoForAuthentication({ payload: { data } }) {
  fetch('http://localhost:1515/api/auth', {
    method: 'POST',
    headers: {
      Accept: 'application/x-www-form-urlencoded',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data.toJS()),
  })
    .then(res => res.json())
    .then(response => console.log('Response ', response))
    .catch(e =>
      console.error('Please enter username and password correctly ', e)
    );
}

export default function* saga() {
  yield takeLatest(SUBMIT_INFO_AND_FETCH_PROFILE, submitInfoForAuthentication);
}
