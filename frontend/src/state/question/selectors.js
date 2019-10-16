import { createSelector } from 'reselect';
import { REDUCER_NAME } from './constants';

export const selectQuestion = state => state.get(REDUCER_NAME);
/* 
export const makePendingList = () =>
  createSelector(
    selectHeadmaster,
    headmasterState => headmasterState.get('pendingTeachers')
  );

export const makeApprovedList = () =>
  createSelector(
    selectHeadmaster,
    headmasterState => headmasterState.get('approvedTeachers')
  ); */
