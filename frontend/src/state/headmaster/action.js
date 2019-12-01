import {
  FETCH_APPROVED_TEACHERS,
  FETCH_PENDING_TEACHERS,
  FETCH_APPROVED_TEACHERS_SUCCESS,
  FETCH_PENDING_TEACHERS_SUCCESS,
  FETCH_DOWNLOAD_ARCHIVE,
  FETCH_DOWNLOAD_ARCHIVE_SUCCESS,
  FETCH_DOWNLOAD_ARCHIVE_FAILURE,
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

export function fetchArchive(id) {
  return { type: FETCH_DOWNLOAD_ARCHIVE, payload: { id } };
}

export function fetchArchiveSuccess(items) {
  return { type: FETCH_DOWNLOAD_ARCHIVE_SUCCESS, payload: { items } };
}
export function fetchArchiveFailure() {
  return { type: FETCH_DOWNLOAD_ARCHIVE_FAILURE };
}
