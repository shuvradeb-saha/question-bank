import { createSelector } from 'reselect';
import { REDUCER_NAME } from './constants';

export const selectLogin = state => state.get(REDUCER_NAME);

export const makeAuthenticated = () =>
  createSelector(
    selectLogin,
    loginState => loginState.get('authenticated')
  );
