/* eslint-disable no-console */
import { put, takeLatest, call } from 'redux-saga/effects';
import { toastError } from 'components/Toaster';

import {
  FETCH_APPROVED_TEACHERS,
  FETCH_PENDING_TEACHERS,
  FETCH_DOWNLOAD_ARCHIVE,
} from './constants';
import {
  fetchApprovedTeacherSuccess,
  fetchPendingTeacherSuccess,
  fetchArchiveSuccess,
  fetchArchiveFailure,
} from './action';
import API from 'utils/api';

export function* fetchPendingTeacherList({ payload: { eiin } }) {
  const url = `/api/headmaster/teacher-list/PENDING/${eiin}`;
  try {
    const pendingList = yield call(API.get, url);
    yield put(fetchPendingTeacherSuccess(pendingList));
  } catch (error) {
    console.log('Error', error);
    toastError('Unable to fetch pending teachers.');
  }
}

export function* fetchApprovedTeacherList({ payload: { eiin } }) {
  const url = `/api/headmaster/teacher-list/APPROVED/${eiin}`;
  try {
    const approvedList = yield call(API.get, url);
    yield put(fetchApprovedTeacherSuccess(approvedList));
  } catch (error) {
    console.log('Error', error);
    toastError('Unable to fetch approved teachers.');
  }
}

export function* fetchDownloadArchive({ payload: { id } }) {
  const uri = `/api/headmaster/download/archive/${id}`;
  try {
    const items = yield API.get(uri);
    yield put(fetchArchiveSuccess(items));
  } catch (error) {
    console.log('Error in Dowonload archive', error);
    toastError('Problem occur while fetching archive.');
    yield put(fetchArchiveFailure());
  }
}
export default function* saga() {
  yield takeLatest(FETCH_PENDING_TEACHERS, fetchPendingTeacherList);
  yield takeLatest(FETCH_APPROVED_TEACHERS, fetchApprovedTeacherList);
  yield takeLatest(FETCH_DOWNLOAD_ARCHIVE, fetchDownloadArchive);
}
