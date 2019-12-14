import {
  SAVE_QUESTION,
  FETCH_ALL_MCQ,
  FETCH_ALL_MCQ_SUCCESS,
  FETCH_ALL_MCQ_FIALURE,
  FETCH_MCQ,
  FETCH_MCQ_SUCCESS,
  FETCH_MCQ_FAILURE,
  FETCH_ALL_MCQ_FOR_MODERATOR,
  FETCH_ALL_MCQ_FOR_MODERATOR_SUCCESS,
  FETCH_MCQ_FOR_MODERATION,
  FETCH_MCQ_FOR_MODERATION_SUCCESS,
  FETCH_MCQ_FOR_MODERATION_FAILURE,
  FETCH_ALL_CQ,
  FETCH_ALL_CQ_SUCCESS,
  FETCH_CQ,
  FETCH_CQ_SUCCESS,
  FETCH_ALL_CQ_FOR_MODERATOR,
  FETCH_ALL_CQ_FOR_MODERATOR_SUCCESS,
  FETCH_CQ_FOR_MODERATION_SUCCESS,
  FETCH_CQ_FOR_MODERATION,
  FETCH_CQ_FOR_MODERATION_FAILURE,
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
export function fetchMcqFailure(errorCode) {
  return { type: FETCH_MCQ_FAILURE, payload: { errorCode } };
}

export function fetchMcqForModerator(status) {
  return { type: FETCH_ALL_MCQ_FOR_MODERATOR, payload: { status } };
}

export function fetchMcqForModeratorSuccess(status, mcqs) {
  return {
    type: FETCH_ALL_MCQ_FOR_MODERATOR_SUCCESS,
    payload: { status, mcqs },
  };
}

export function fetchMcqForModeration(id) {
  return { type: FETCH_MCQ_FOR_MODERATION, payload: { id } };
}

export function fetchMcqForModerationSuccess(mcqDetails) {
  return { type: FETCH_MCQ_FOR_MODERATION_SUCCESS, payload: { mcqDetails } };
}

export function fetchMcqForModerationFailure(errorCode) {
  return { type: FETCH_MCQ_FOR_MODERATION_FAILURE, payload: { errorCode } };
}

export function fetchAllCq(status, teacherId) {
  return { type: FETCH_ALL_CQ, payload: { status, teacherId } };
}

export function fetchAllCqSuccess(status, cqs) {
  return { type: FETCH_ALL_CQ_SUCCESS, payload: { status, cqs } };
}

export function fetchCq(questionId) {
  return { type: FETCH_CQ, payload: { questionId } };
}
export function fetchCqSuccess(cq) {
  return { type: FETCH_CQ_SUCCESS, payload: { cq } };
}
export function fetchCqFailure(errorCode) {
  return { type: FETCH_MCQ_FAILURE, payload: { errorCode } };
}

export function fetchAllCqForModerator(status) {
  return { type: FETCH_ALL_CQ_FOR_MODERATOR, payload: { status } };
}

export function fetchAllCqForModeratorSuccess(status, cqs) {
  return { type: FETCH_ALL_CQ_FOR_MODERATOR_SUCCESS, payload: { status, cqs } };
}

export function fetchCQForModeration(id) {
  return { type: FETCH_CQ_FOR_MODERATION, payload: { id } };
}

export function fetchCQForModerationSuccess(cqDetails) {
  return { type: FETCH_CQ_FOR_MODERATION_SUCCESS, payload: { cqDetails } };
}

export function fetchCQForModerationFailure(errorCode) {
  return { type: FETCH_CQ_FOR_MODERATION_FAILURE, payload: { errorCode } };
}
