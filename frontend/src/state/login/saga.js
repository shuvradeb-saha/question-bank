/* eslint-disable no-console */
import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { toastError } from 'components/Toaster';

import API from 'utils/api';
import {
  SUBMIT_INFO_AND_FETCH_PROFILE,
  FETCH_CURRENT_PROFILE,
  FETCH_ALL_CLASS,
  FETCH_ALL_SUBJECT,
  FETCH_ALL_CHAPTER,
  FETCH_ALLOCATED_SUBJECTS,
} from './constants';

import {
  fetchProfileSuccess,
  fetchProfileFailure,
  fetchAllClassSuccess,
  fetchAllsubjectSuccess,
  fetchAllChaptersSuccess,
  fetchAllocateSubjectSuccess,
} from './action';

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
  } else {
    const status = response.status;
    let errorMsg = 'Incorrect username and/or password';
    if (status === 500) {
      errorMsg =
        'Unexpected problem occur on the server. Please reload the page.';
    }
    yield put(fetchProfileFailure(status));
    toastError(errorMsg);
    return;
  }
}

export function* fetchCurrentProfile() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      yield put(fetchProfileFailure('Please login first'));
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
    } else {
      // toastError('Could not fetch the user');
      yield put(fetchProfileFailure('Error', response));
    }
  } catch (e) {
    console.log('Error in current user fetching: ', e);
    // toastError('Could not fetch the user');
    yield put(fetchProfileFailure(e));
  }
}

export function* fetchAllClasses() {
  try {
    const classes = yield call(API.get, 'api/user/class');
    yield put(fetchAllClassSuccess(classes));
  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchAllSubjects() {
  try {
    const subjects = yield call(API.get, 'api/user/subject');
    yield put(fetchAllsubjectSuccess(subjects));
  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchAllChapter() {
  try {
    const allChapters = yield call(API.get, 'api/user/chapters');
    yield put(fetchAllChaptersSuccess(allChapters));
  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchAllocateSubject({ payload: { teacherId } }) {
  const uri = `/api/teacher/allocation/${teacherId}`;
  try {
    const ids = yield call(API.get, uri);
    yield put(fetchAllocateSubjectSuccess(ids));
  } catch (error) {
    console.log('Error: ', error);
  }
}

export default function* saga() {
  yield takeLatest(SUBMIT_INFO_AND_FETCH_PROFILE, submitInfoForAuthentication);
  yield takeEvery(FETCH_CURRENT_PROFILE, fetchCurrentProfile);
  yield takeEvery(FETCH_ALL_CLASS, fetchAllClasses);
  yield takeEvery(FETCH_ALL_SUBJECT, fetchAllSubjects);
  yield takeEvery(FETCH_ALL_CHAPTER, fetchAllChapter);
  yield takeLatest(FETCH_ALLOCATED_SUBJECTS, fetchAllocateSubject);
}
