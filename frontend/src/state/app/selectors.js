import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');

export const makeRoute = () =>
  createSelector(
    selectRoute,
    routeState => routeState
  );

export const makeLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.get('location')
  );

export const makePathName = () =>
  createSelector(
    makeLocation(),
    location => location.get('pathname')
  );
