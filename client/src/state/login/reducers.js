import { fromJS } from 'immutable';

import { FETCH_PROFILE } from './constants';

// The initial state of the App
const initialState = fromJS({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  roles: [],
  authenticated: false,
  inProgress: false,
  error: '',
});

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PROFILE:
      return state.merge({ inProgress: true, error: '' });
    default:
      return state;
  }
}

export default reducer;
