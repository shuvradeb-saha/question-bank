import { fromJS } from 'immutable';

import {
  SUBMIT_INFO_AND_FETCH_PROFILE,
  SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS,
  FETCH_CURRENT_PROFILE,
  FETCH_CURRENT_PROFILE_FAILURE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  user: '',
  roles: [],
  authenticated: false,
  inProgress: false,
  error: '',
});

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SUBMIT_INFO_AND_FETCH_PROFILE:
      return state.merge({ inProgress: true, error: '' });
    case SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS: {
      const { data } = payload;

      const { roles, user } = data;
      return state
        .merge(fromJS({ roles, user }))
        .merge({ authenticated: true, inProgress: false, error: '' });
    }
    case FETCH_CURRENT_PROFILE: {
      return state.merge({ inProgress: true, error: '' });
    }
    case FETCH_CURRENT_PROFILE_FAILURE: {
      const { error } = payload;
      return state.merge({ inProgress: false, error });
    }
    default:
      return state;
  }
}

export default reducer;
