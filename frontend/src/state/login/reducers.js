import { fromJS } from 'immutable';

import { SUBMIT_INFO_AND_FETCH_PROFILE } from './constants';

// The initial state of the App
const initialState = fromJS({
  email: '',
  firstName: '',
  lastName: '',
  eiin: '',
  institue: '',
  roles: [],
  authenticated: false,
  inProgress: false,
  error: '',
});

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SUBMIT_INFO_AND_FETCH_PROFILE:
      return state.merge({ inProgress: true, error: '' });

    default:
      return state;
  }
}

export default reducer;
