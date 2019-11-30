import { createSelector } from 'reselect';
import { REDUCER_NAME } from './constants';

export const selectLogin = state => state.get(REDUCER_NAME);

export const makeAuthenticated = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('authenticated')
  );

export const makeLoginErrorCode = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('error')
  );

export const makeUserName = () =>
  createSelector(
    selectLogin,
    loginState => {
      const user = loginState.get('user').toJS();
      return `${user.firstName} ${user.lastName}`;
    }
  );

export const makeRoles = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('roles')
  );

export const makeInProgress = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('inProgress')
  );

export const makeEiin = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('user').get('eiinNumber')
  );

export const makeAllSubjects = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('subject').get('allSubjects')
  );

export const makeAllClasses = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('clasz').get('allClasses')
  );

export const makeAllChapters = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('chapters').get('allChapters')
  );

export const makeUserId = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('user').get('id')
  );

export const makeallAocatedSubjects = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('allocatedSubjects')
  );

export const makePropic = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('profilePic')
  );
export const makeUser = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('user')
  );
