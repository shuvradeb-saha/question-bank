import { fromJS } from 'immutable';

import {
  FETCH_APPROVED_TEACHERS_SUCCESS,
  FETCH_PENDING_TEACHERS_SUCCESS,
  FETCH_DOWNLOAD_ARCHIVE_SUCCESS,
  FETCH_DOWNLOAD_ARCHIVE,
  FETCH_DOWNLOAD_ARCHIVE_FAILURE,
} from './constants';

const initialState = fromJS({
  pendingTeachers: [],
  approvedTeachers: [],
  archiveItems: [],
  inProgress: false,
  error: '',
});

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_DOWNLOAD_ARCHIVE: {
      return state.merge(fromJS({ inProgress: true }));
    }

    case FETCH_PENDING_TEACHERS_SUCCESS: {
      const { pendingList } = payload;
      return state.merge(fromJS({ pendingTeachers: pendingList }));
    }

    case FETCH_APPROVED_TEACHERS_SUCCESS: {
      const { approvedList } = payload;
      return state.merge(fromJS({ approvedTeachers: approvedList }));
    }

    case FETCH_DOWNLOAD_ARCHIVE_SUCCESS: {
      const { items } = payload;
      return state.merge(fromJS({ archiveItems: items, inProgress: false }));
    }

    case FETCH_DOWNLOAD_ARCHIVE_FAILURE: {
      return state.merge(fromJS({ inProgress: false }));
    }

    default:
      return state;
  }
}

export default reducer;
