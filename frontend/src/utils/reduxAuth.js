import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';
import { routerActions } from 'react-router-redux';

import { REDUCER_NAME } from 'state/login/constants';

const authenticatedSelector = state =>
  state.get(REDUCER_NAME).get('authenticated');

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector,
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectAction: routerActions.replace,
});

const locationHelper = locationHelperBuilder({});
export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  authenticatedSelector: state => !authenticatedSelector(state),
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectAction: routerActions.replace,
});

export const visibleOnlyAuthenticated = unauthenticatedComponent => {
  let FailureComponent = unauthenticatedComponent;
  if (!FailureComponent) {
    FailureComponent = () => null;
  }

  return connectedAuthWrapper({
    authenticatedSelector,
    wrapperDisplayName: 'VisibleOnlyAuthenticated',
    FailureComponent,
  });
};
