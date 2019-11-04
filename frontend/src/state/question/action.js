import {
  SAVE_QUESTION,
  FETCH_ALL_MCQ,
  FETCH_ALL_MCQ_SUCCESS,
  FETCH_ALL_MCQ_FIALURE,
  FETCH_MCQ,
  FETCH_MCQ_SUCCESS,
} from './constants';

export function saveQuestion(question, type) {
  return { type: SAVE_QUESTION, payload: { question, type } };
}

export function fetchAllMcq(status, teacherId) {
  return { type: FETCH_ALL_MCQ, payload: { status, teacherId } };
}

export function fetchAllMcqSuccess(status, mcqs) {
  return { type: FETCH_ALL_MCQ_SUCCESS, payload: { status, mcqs } };
}

export function fetchAllMcqFailure() {
  return { type: FETCH_ALL_MCQ_FIALURE };
}

export function fetchMcq(questionId) {
  return { type: FETCH_MCQ, payload: { questionId } };
}

export function fetchMcqSuccess(mcq) {
  return { type: FETCH_MCQ_SUCCESS, payload: { mcq } };
}
