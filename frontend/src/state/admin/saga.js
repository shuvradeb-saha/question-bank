/* eslint-disable no-console */
import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';
//import { push } from 'react-router-redux';
import { toastSuccess, toastError } from 'components/Toaster';
import {
  FETCH_ALL_ROLES,
  SAVE_USER,
  SAVE_INSTITUTE,
  FETCH_ALL_INSTITUTE,
  FETCH_INSTITUTE,
  FETCH_ALL_EIIN,
  FETCH_NEW_PASSWORD,
} from './constants';
import {
  fetchFailure,
  fetchAllRolesSuccess,
  fetchAllInstituteSuccess,
  fetchInstituteSuccess,
  fetchAllInstitute,
  fetchEiinNumbersSuccess,
  fetchNewPasswordSuccess,
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

export function* saveUserInfo({ payload: { data } }) {
  try {
    const response = yield call(API.post, 'api/admin/user', data);
    console.log('Response', response);
  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* saveInstituteInfo({ payload: { data } }) {
  if (data.id) {
    try {
      yield call(API.put, `api/admin/institute`, data);
      toastSuccess('Institute info updated successfully');
      yield put(fetchAllInstitute());
    } catch (error) {
      console.log('Error: ', error);
      toastError('Error updating the institute');
    }
  } else {
    try {
      const response = yield call(API.post, 'api/admin/institute', data);
      console.log('Response: ', response);
      yield put(fetchAllInstitute());
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}

export function* fetchInstitutes() {
  try {
    const allInstitute = yield call(API.get, 'api/admin/institutes');
    yield put(fetchAllInstituteSuccess(allInstitute));
  } catch (e) {
    console.log('Error in All Roles fetching: ', e);
    yield put(fetchFailure(e));
  }
}

export function* fetchInstitute({ payload: { id } }) {
  try {
    const instituteDetails = yield call(API.get, `api/admin/institute/${id}`);

    yield put(fetchInstituteSuccess(instituteDetails));
  } catch (e) {
    console.log('Error in All Roles fetching: ', e);
    yield put(fetchFailure(e));
  }
}

export function* fetchEiinNumbers() {
  try {
    const allEiin = yield call(API.get, 'api/admin/institutes/eiin');
    yield put(fetchEiinNumbersSuccess(allEiin));
  } catch (e) {
    console.log('Error in All EIIN fetching: ', e);
    yield put(fetchFailure(e));
  }
}

export function* fetchNewPassword() {
  try {
    const password = yield call(API.get, 'api/admin/generate-password');
    yield put(fetchNewPasswordSuccess(password));
  } catch (e) {
    console.log('Error in All EIIN fetching: ', e);
    yield put(fetchFailure(e));
  }
}

export default function* saga() {
  yield takeEvery(FETCH_ALL_ROLES, fetchAllRoles);
  yield takeLatest(SAVE_USER, saveUserInfo);
  yield takeLatest(SAVE_INSTITUTE, saveInstituteInfo);
  yield takeLatest(FETCH_ALL_INSTITUTE, fetchInstitutes);
  yield takeLatest(FETCH_INSTITUTE, fetchInstitute);
  yield takeLatest(FETCH_ALL_EIIN, fetchEiinNumbers);
  yield takeEvery(FETCH_NEW_PASSWORD, fetchNewPassword);
}
