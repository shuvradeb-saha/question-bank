/* eslint-disable no-console */
import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  FETCH_ALL_ROLES,
  SAVE_USER,
  SAVE_INSTITUTE,
  FETCH_ALL_INSTITUTE,
} from './constants';
import {
  fetchFailure,
  fetchAllRolesSuccess,
  fetchAllInstituteSuccess,
} from './action';

import API from 'utils/api';

export function* fetchAllRoles() {
  try {
    const allRoles = yield call(API.get, 'api/admin/roles');
    yield put(fetchAllRolesSuccess(allRoles));
  } catch (e) {
    console.log('Error in All Roles fetching: ', e);
    yield put(fetchFailure(e));
  }
}

export function* fetchAllInstitute() {
  try {
    const allRoles = yield call(API.get, 'api/admin/institutes');
    yield put(fetchAllInstituteSuccess(allRoles));
  } catch (e) {
    console.log('Error in All Roles fetching: ', e);
    yield put(fetchFailure(e));
  }
}

export function* saveUserInfo({ payload: { data } }) {
  try {
    const response = yield call(API.post, 'api/admin/user', data);
    console.log('Response', response);
  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* saveInstituteInfo({ payload: { data } }) {
  try {
    const response = yield call(API.post, 'api/admin/institute', data);
    console.log('Response: ', response);
  } catch (error) {
    console.log('Error: ', error);
  }
}

export default function* saga() {
  yield takeEvery(FETCH_ALL_ROLES, fetchAllRoles);
  yield takeLatest(SAVE_USER, saveUserInfo);
  yield takeLatest(SAVE_INSTITUTE, saveInstituteInfo);
  yield takeLatest(FETCH_ALL_INSTITUTE, fetchAllInstitute);
}
