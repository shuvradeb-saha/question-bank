/* eslint-disable no-console */
import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { toastError, toastSuccess } from 'components/Toaster';
import { QuestionType } from 'containers/CreateQuestion/Question';
import API from 'utils/api';
import {
  fetchAllMcqSuccess,
  fetchMcqSuccess,
  fetchMcqFailure,
  fetchMcqForModeratorSuccess,
  fetchMcqForModerationSuccess,
  fetchMcqForModerationFailure,
  fetchAllCqSuccess,
  fetchCqSuccess,
  fetchCqFailure,
  fetchAllCqForModeratorSuccess,
  fetchCQForModerationSuccess,
  fetchCQForModerationFailure,
} from './action';
import {
  SAVE_QUESTION,
  FETCH_ALL_MCQ,
  FETCH_MCQ,
  FETCH_ALL_MCQ_FOR_MODERATOR,
  FETCH_MCQ_FOR_MODERATION,
  FETCH_ALL_CQ,
  FETCH_CQ,
  FETCH_ALL_CQ_FOR_MODERATOR,
  FETCH_CQ_FOR_MODERATION,
} from './constants';

export function* saveQuestion({ payload: { question, type } }) {
  if (QuestionType.MCQ === type) {
    const saveNewUri = '/api/teacher/question/mcq';
    try {
      yield call(API.post, saveNewUri, question);
      toastSuccess('Question has successfully submitted for approval.');
      yield put(push('/question/create'));
    } catch (error) {
      toastError(`Unable to save. ${error.response.data.message}`);
      console.log('Error: ', error);
    }
  }
}

export function* fetchMcqs({ payload: { status, teacherId } }) {
  const uri = `/api/teacher/question/mcq/${status}/${teacherId}`;
  try {
    const mcqs = yield call(API.get, uri);
    yield put(fetchAllMcqSuccess(status, mcqs));
  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchMcqById({ payload: { questionId } }) {
  const uri = `/api/teacher/question/mcq/${questionId}`;
  try {
    const question = yield call(API.get, uri);
    yield put(fetchMcqSuccess(question));
  } catch (error) {
    // toastError(error.response.data.message);
    console.log('Error in saga: ', error);
    yield put(fetchMcqFailure(error.response.status));
  }
}

export function* fetchModeratorAllMcq({ payload: { status } }) {
  const uri = `/api/moderator/all/mcq/${status}`;
  try {
    const mcqs = yield call(API.get, uri);
    yield put(fetchMcqForModeratorSuccess(status, mcqs));
  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchMcqForModeration({ payload: { id } }) {
  const uri = `/api/moderator/mcq/${id}`;
  try {
    const mcqDetails = yield call(API.get, uri);
    yield put(fetchMcqForModerationSuccess(mcqDetails));
  } catch (error) {
    yield put(fetchMcqForModerationFailure(error.response.status));
    console.log('Error: ', error);
  }
}

export function* fetchAllCQ({ payload: { status, teacherId } }) {
  const uri = `/api/teacher/question/cq/${status}/${teacherId}`;
  try {
    const cqs = yield call(API.get, uri);
    yield put(fetchAllCqSuccess(status, cqs));
  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchCqById({ payload: { questionId } }) {
  const uri = `/api/teacher/question/cq/${questionId}`;
  try {
    const question = yield call(API.get, uri);
    yield put(fetchCqSuccess(question));
  } catch (error) {
    // toastError(error.response.data.message);
    console.log('Error in saga: ', error);
    yield put(fetchCqFailure(error.response.status));
  }
}

export function* fetchAllCqForModerator({ payload: { status } }) {
  const uri = `/api/moderator/all/cq/${status}`;

  try {
    const cqs = yield call(API.get, uri);

    yield put(fetchAllCqForModeratorSuccess(status, cqs));
  } catch (error) {
    console.log('Error: ', error);
  }
}

export function* fetchCqForModeration({ payload: { id } }) {
  console.log('id', id);

  try {
    const uri = `/api/moderator/cq/${id}`;
    const cqDetails = yield call(API.get, uri);

    yield put(fetchCQForModerationSuccess(cqDetails));
  } catch (error) {
    yield put(fetchCQForModerationFailure(error.response.status));
    console.log('Error: ', error);
  }
}

export default function* saga() {
  yield takeLatest(SAVE_QUESTION, saveQuestion);
  yield takeLatest(FETCH_ALL_MCQ, fetchMcqs);
  yield takeLatest(FETCH_MCQ, fetchMcqById);
  yield takeLatest(FETCH_ALL_MCQ_FOR_MODERATOR, fetchModeratorAllMcq);
  yield takeLatest(FETCH_MCQ_FOR_MODERATION, fetchMcqForModeration);
  yield takeLatest(FETCH_ALL_CQ, fetchAllCQ);
  yield takeLatest(FETCH_CQ, fetchCqById);
  yield takeLatest(FETCH_ALL_CQ_FOR_MODERATOR, fetchAllCqForModerator);
  yield takeLatest(FETCH_CQ_FOR_MODERATION, fetchCqForModeration);
}
