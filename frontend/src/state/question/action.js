import { SAVE_QUESTION } from './constants';

export function saveQuestion(question, type) {
  return { type: SAVE_QUESTION, payload: { question, type } };
}
