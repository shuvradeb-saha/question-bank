import {
  FETCH_APPROVED_TEACHERS,
  FETCH_PENDING_TEACHERS,
  FETCH_APPROVED_TEACHERS_SUCCESS,
  FETCH_PENDING_TEACHERS_SUCCESS,
} from './constants';

export function fetchPendingTeachers(eiin) {
  return { type: FETCH_PENDING_TEACHERS, payload: { eiin } };
}

export function fetchApprovedTeachers(eiin) {
  return { type: FETCH_APPROVED_TEACHERS, payload: { eiin } };
}

export function fetchPendingTeacherSuccess(pendingList) {
  return { type: FETCH_PENDING_TEACHERS_SUCCESS, payload: { pendingList } };
}

export function fetchApprovedTeacherSuccess(approvedList) {
  return { type: FETCH_APPROVED_TEACHERS_SUCCESS, payload: { approvedList } };
}
