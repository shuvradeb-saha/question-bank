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
    adminState => adminState.get('institute').get('allInstitutes')
  );

export const makeInstituteDetail = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('institute').get('details')
  );

export const makeAllEiinNumbers = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('allEiinNumber')
  );

export const makeAllUsers = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('user').get('allUsers')
  );

export const makeNewPassword = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('user').get('generatedPassword')
  );

export const makeUserDetails = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('user').get('details')
  );

export const makeClasses = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('clasz').get('allClasses')
  );

export const makeClassDetail = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('clasz').get('details')
  );

export const makeSubjects = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('subject').get('allSubjects')
  );

export const makeSubjectDetail = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('subject').get('details')
  );

export const makeAllChapters = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('chapters').get('allChapters')
  );

export const makeChapter = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('chapters').get('details')
  );
export const makeInProgress = () =>
  createSelector(
    selectAdmin,
    adminState => adminState.get('inProgress')
  );
