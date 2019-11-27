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

export const makeMcqForModerator = () =>
  createSelector(
    selectQuestion,
    questionState =>
      questionState
        .get('moderator')
        .get('mcq')
        .get('question')
  );

export const makeSimilarMcqs = () =>
  createSelector(
    selectQuestion,
    questionState =>
      questionState
        .get('moderator')
        .get('mcq')
        .get('similar')
  );

export const makePendingCqs = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('pendingCqs')
  );

export const makeApprovedCqs = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('approvedCqs')
  );

export const makeRejectedCqs = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('rejectedCqs')
  );

export const makeCq = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('cq')
  );

export const makePendingCqsForModerator = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('moderator').get('pendingCqs')
  );

export const makeApprovedCqsByModerator = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('moderator').get('approvedCqs')
  );

export const makeRejectedCqsByModerator = () =>
  createSelector(
    selectQuestion,
    questionState => questionState.get('moderator').get('rejectedCqs')
  );

export const makeCqForModerator = () =>
  createSelector(
    selectQuestion,
    questionState =>
      questionState
        .get('moderator')
        .get('cq')
        .get('question')
  );

export const makeSimilarCqs = () =>
  createSelector(
    selectQuestion,
    questionState =>
      questionState
        .get('moderator')
        .get('cq')
        .get('similar')
  );
