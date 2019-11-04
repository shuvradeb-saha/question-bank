import { createSelector } from 'reselect';
import { REDUCER_NAME } from './constants';

export const selectQuestion = state => state.get(REDUCER_NAME);

export const makePendingMcqs = status =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('pendingMcqs')
  );

export const makeApprovedMcqs = status =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('approvedMcqs')
  );

export const makeRejectedMcqs = status =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('rejectedMcqs')
  );
