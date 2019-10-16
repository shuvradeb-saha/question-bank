/* eslint-disable no-console */
import { put, takeLatest, call } from 'redux-saga/effects';

import { toastError, toastSuccess } from 'components/Toaster';
import { QuestionType } from 'containers/CreateQuestion/Question';
import API from 'utils/api';
import { SAVE_QUESTION } from './constants';

export function* saveQuestion({ payload: { question, type } }) {
  console.log('question', question);
  console.log('type', type);
  if (QuestionType.MCQ === type) {
    const saveNewUri = '/api/teacher/question/mcq';
    try {
      const saved = yield call(API.post, saveNewUri, question);
      console.log('saved question', saved);

      toastSuccess('Question submitted for approval successfully.');
    } catch (error) {
      toastError('Unable to save.');
      console.log('Error: ', error);
    }
  }
}

export default function* saga() {
  yield takeLatest(SAVE_QUESTION, saveQuestion);
}
