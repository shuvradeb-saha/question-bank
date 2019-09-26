/* eslint-disable no-console */
import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { toastError } from 'components/Toaster';

import { FETCH_APPROVED_TEACHERS, FETCH_PENDING_TEACHERS } from './constants';
import {
  fetchApprovedTeacherSuccess,
  fetchPendingTeacherSuccess,
} from './action';
import API from 'utils/api';

export function* fetchPendingTeacherList({ payload: { eiin } }) {
  const url = `/api/headmaster/teacher-list/PENDING/${eiin}`;
  try {
    const pendingList = yield call(API.get, url);
    yield put(fetchPendingTeacherSuccess(pendingList));
  } catch (error) {
    console.log('Error', error);
    toastError('Unable to fetch');
  }
}

export function* fetchApprovedTeacherList({ payload: { eiin } }) {
  const url = `/api/headmaster/teacher-list/APPROVED/${eiin}`;
  try {
    const approvedList = yield call(API.get, url);
    yield put(fetchApprovedTeacherSuccess(approvedList));
  } catch (error) {
    console.log('Error', error);
    toastError('Unable to fetch');
  }
}

export default function* saga() {
  yield takeLatest(FETCH_PENDING_TEACHERS, fetchPendingTeacherList);
  yield takeLatest(FETCH_APPROVED_TEACHERS, fetchApprovedTeacherList);
}
