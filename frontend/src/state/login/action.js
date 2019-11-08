import {
  SUBMIT_INFO_AND_FETCH_PROFILE,
  SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS,
  FETCH_CURRENT_PROFILE,
  FETCH_CURRENT_PROFILE_FAILURE,
  LOGOUT_USER,
  FETCH_ALL_CLASS,
  FETCH_ALL_CLASS_SUCCESS,
  FETCH_ALL_CHAPTER,
  FETCH_ALL_CHAPTER_SUCCESS,
  FETCH_ALL_SUBJECT,
  FETCH_ALL_SUBJECT_SUCCESS,
  FETCH_ALLOCATED_SUBJECTS,
  FETCH_ALLOCATED_SUBJECTS_SUCCESS,
} from './constants';

export function submitLoginInfo(data) {
  return { type: SUBMIT_INFO_AND_FETCH_PROFILE, payload: { data } };
}

export function fetchProfileSuccess(data) {
  return { type: SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS, payload: { data } };
}

export function fetchCurrentUserProfile() {
  return { type: FETCH_CURRENT_PROFILE };
}

export function fetchProfileFailure(error) {
  return { type: FETCH_CURRENT_PROFILE_FAILURE, payload: { error } };
}

export function logout() {
  return { type: LOGOUT_USER };
}

export function fetchAllClass() {
  return { type: FETCH_ALL_CLASS };
}

export function fetchAllClassSuccess(classes) {
  return { type: FETCH_ALL_CLASS_SUCCESS, payload: { classes } };
}

export function fetchAllSubject() {
  return { type: FETCH_ALL_SUBJECT };
}

export function fetchAllsubjectSuccess(subjects) {
  return { type: FETCH_ALL_SUBJECT_SUCCESS, payload: { subjects } };
}

export function fetchAllChapters() {
  return { type: FETCH_ALL_CHAPTER };
}

export function fetchAllChaptersSuccess(data) {
  return { type: FETCH_ALL_CHAPTER_SUCCESS, payload: { data } };
}

export function fetchAllocatedSubject(teacherId) {
  return { type: FETCH_ALLOCATED_SUBJECTS, payload: { teacherId } };
}

export function fetchAllocateSubjectSuccess(subjectIds) {
  return { type: FETCH_ALLOCATED_SUBJECTS_SUCCESS, payload: { subjectIds } };
}
