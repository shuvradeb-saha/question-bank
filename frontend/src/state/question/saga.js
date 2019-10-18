/* eslint-disable no-console */
import { takeLatest, call } from 'redux-saga/effects';

import { toastError, toastSuccess } from 'components/Toaster';
import { QuestionType } from 'containers/CreateQuestion/Question';
import API from 'utils/api';
import { SAVE_QUESTION } from './constants';

export function* saveQuestion({ payload: { question, type } }) {
  if (QuestionType.MCQ === type) {
    const saveNewUri = '/api/teacher/question/mcq';
    try {
      const saved = yield call(API.post, saveNewUri, question);
      console.log('saved question', saved);

      toastSuccess('Question has successfully submitted for approval.');
    } catch (error) {
      toastError(`Unable to save. ${error.response.data.message}`);
      console.log('Error: ', error);
    }
  }
}

export default function* saga() {
  yield takeLatest(SAVE_QUESTION, saveQuestion);
}
