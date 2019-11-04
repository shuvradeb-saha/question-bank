/* eslint-disable no-console */
import { takeLatest, call, put } from 'redux-saga/effects';

import { toastError, toastSuccess } from 'components/Toaster';
import { QuestionType } from 'containers/CreateQuestion/Question';
import API from 'utils/api';
import { fetchAllMcqSuccess, fetchMcqSuccess } from './action';
import { SAVE_QUESTION, FETCH_ALL_MCQ, FETCH_MCQ } from './constants';

export function* saveQuestion({ payload: { question, type } }) {
  if (QuestionType.MCQ === type) {
    const saveNewUri = '/api/teacher/question/mcq';
    try {
      yield call(API.post, saveNewUri, question);
      toastSuccess('Question has successfully submitted for approval.');
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
  console.log('question', questionId);

  const uri = `/api/teacher/question/mcq/${questionId}`;
  try {
    const question = yield call(API.get, uri);
    yield put(fetchMcqSuccess(question));
  } catch (error) {
    console.log('Error: ', error);
  }
}

export default function* saga() {
  yield takeLatest(SAVE_QUESTION, saveQuestion);
  yield takeLatest(FETCH_ALL_MCQ, fetchMcqs);
  yield takeLatest(FETCH_MCQ, fetchMcqById);
}
