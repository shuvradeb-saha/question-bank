import { createSelector } from 'reselect';
import { REDUCER_NAME } from './constants';

export const selectQuestion = state => state.get(REDUCER_NAME);

export const makePendingMcqs = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('pendingMcqs')
  );

export const makeApprovedMcqs = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('approvedMcqs')
  );

export const makeRejectedMcqs = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('rejectedMcqs')
  );

export const makeMcq = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('mcq')
  );
export const makeInProgress = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('inProgress')
  );

export const makeErrorCode = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('errorCode')
  );

export const makePendingMcqsForModerator = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('moderator').get('pendingMcqs')
  );

export const makeApprovedMcqsByModerator = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('moderator').get('approvedMcqs')
  );

export const makeRejectedMcqsByModerator = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('moderator').get('rejectedMcqs')
  );
