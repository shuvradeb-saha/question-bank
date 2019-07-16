import { createSelector } from 'reselect';
import { REDUCER_NAME } from './constants';

export const selectAdmin = state => state.get(REDUCER_NAME);

export const makeAllRoles = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('allRoles')
  );
export const makeInstitutes = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('allInstitutes')
  );
