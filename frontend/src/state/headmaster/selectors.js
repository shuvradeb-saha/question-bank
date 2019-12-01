import { createSelector } from 'reselect';
import { REDUCER_NAME } from './constants';

export const selectHeadmaster = state => state.get(REDUCER_NAME);

export const makePendingList = () =>
  createSelector(
    selectHeadmaster,
    headmasterState => headmasterState.get('pendingTeachers')
  );

export const makeApprovedList = () =>
  createSelector(
    selectHeadmaster,
    headmasterState => headmasterState.get('approvedTeachers')
  );

export const makeArchiveItems = () =>
  createSelector(
    selectHeadmaster,
    headmasterState => headmasterState.get('archiveItems')
  );
