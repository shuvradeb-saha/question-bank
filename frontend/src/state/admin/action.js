import {
  FETCH_ALL_ROLES,
  FETCH_ALL_ROLES_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_ALL_INSTITUTE,
  FETCH_ALL_INSTITUTE_SUCCESS,
  FETCH_INSTITUTE,
  FETCH_INSTITUTE_SUCCESS,
  FETCH_ALL_EIIN,
  FETCH_ALL_EIIN_SUCCESS,
  FETCH_NEW_PASSWORD,
  SAVE_USER,
  SAVE_INSTITUTE,
  FETCH_NEW_PASSWORD_SUCCESS,
} from './constants';

export function fetchAllRoles() {
  return { type: FETCH_ALL_ROLES };
}

export function fetchAllRolesSuccess(allRoles) {
  return { type: FETCH_ALL_ROLES_SUCCESS, payload: { allRoles } };
}

export function fetchFailure(error) {
  return { type: FETCH_DATA_FAILURE, payload: { error } };
}

export function fetchAllInstitute() {
  return { type: FETCH_ALL_INSTITUTE };
}

export function fetchInstitute(id) {
  return { type: FETCH_INSTITUTE, payload: { id } };
}

export function fetchInstituteSuccess(data) {
  return { type: FETCH_INSTITUTE_SUCCESS, payload: { data } };
}

export function fetchAllInstituteSuccess(data) {
  return { type: FETCH_ALL_INSTITUTE_SUCCESS, payload: { data } };
}

export function fetchEiinNumbers() {
  return { type: FETCH_ALL_EIIN };
}

export function fetchEiinNumbersSuccess(data) {
  return { type: FETCH_ALL_EIIN_SUCCESS, payload: { data } };
}
export function fetchNewPassword() {
  return { type: FETCH_NEW_PASSWORD };
}

export function fetchNewPasswordSuccess(password) {
  return { type: FETCH_NEW_PASSWORD_SUCCESS, payload: { password } };
}
export function saveUser(data) {
  return { type: SAVE_USER, payload: { data } };
}

export function saveInstitute(data) {
  return { type: SAVE_INSTITUTE, payload: { data } };
}
