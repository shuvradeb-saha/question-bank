import { fromJS } from 'immutable';

import {
  FETCH_ALL_ROLES_SUCCESS,
  FETCH_ALL_INSTITUTE_SUCCESS,
  FETCH_INSTITUTE_SUCCESS,
} from './constants';

const initialState = fromJS({
  allRoles: [],
  institute: {
    allInstitutes: [],
    details: {},
  },
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
      const institute = state.get('institute').toJS();
      institute.allInstitutes = data;
      return state.merge(fromJS({ institute }));
    }
    case FETCH_INSTITUTE_SUCCESS: {
      const { data } = payload;
      const institute = state.get('institute').toJS();
      institute.details = data;
      return state.merge(fromJS({ institute }));
    }
    default:
      return state;
  }
}

export default reducer;
