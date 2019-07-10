import { createSelector } from 'reselect';
import { REDUCER_NAME } from './constants';

export const selectLogin = state => state.get(REDUCER_NAME);

export const makeAuthenticated = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('authenticated')
  );

export const makeUserName = () => createSelector(selectLogin, loginState => {
  console.log();
  const user = loginState.get('user').toJS();
  console.log(user);
  return `${user.firstName} ${user.lastName}`;
});

export const makeRoles = () => 
createSelector(selectLogin,  loginState => loginState.get('roles'));