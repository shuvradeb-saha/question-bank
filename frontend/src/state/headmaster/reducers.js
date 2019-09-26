import { fromJS } from 'immutable';

import {
  FETCH_APPROVED_TEACHERS_SUCCESS,
  FETCH_PENDING_TEACHERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  pendingTeachers: [],
  approvedTeachers: [],
  inProgress: false,
  error: '',
});

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PENDING_TEACHERS_SUCCESS: {
      const { pendingList } = payload;
      return state.merge(fromJS({ pendingTeachers: pendingList }));
    }

    case FETCH_APPROVED_TEACHERS_SUCCESS: {
      const { approvedList } = payload;
      return state.merge(fromJS({ approvedTeachers: approvedList }));
    }

    default:
      return state;
  }
}

export default reducer;
