import { fromJS } from 'immutable';

import {
  FETCH_ALL_ROLES_SUCCESS,
  FETCH_ALL_INSTITUTE_SUCCESS,
} from './constants';

const initialState = fromJS({
  allRoles: [],
  allInstitutes: [],
  error: '',
});

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_ALL_ROLES_SUCCESS: {
      const { allRoles } = payload;
      return state.merge(fromJS({ allRoles }));
    }
    case FETCH_ALL_INSTITUTE_SUCCESS: {
      const { data } = payload;
      return state.merge(fromJS({ allInstitutes: data }));
    }
    default:
      return state;
  }
}

export default reducer;
