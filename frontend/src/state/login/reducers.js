import { fromJS } from 'immutable';

import {
  SUBMIT_INFO_AND_FETCH_PROFILE,
  SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS,
  FETCH_CURRENT_PROFILE,
  FETCH_CURRENT_PROFILE_FAILURE,
  LOGOUT_USER,
  FETCH_ALL_CLASS_SUCCESS,
  FETCH_ALL_SUBJECT_SUCCESS,
  FETCH_ALL_CHAPTER_SUCCESS,
} from './constants';

const initialState = fromJS({
  user: '',
  roles: [],
  authenticated: false,
  inProgress: false,
  allocatedSubjects: [],
  error: '',
  clasz: {
    allClasses: [],
    details: {},
  },
  subject: {
    allSubjects: [],
    details: {},
  },
  chapters: {
    allChapters: [],
    details: {},
  },
});

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SUBMIT_INFO_AND_FETCH_PROFILE:
      return state.merge({ inProgress: true, error: '' });

    case SUBMIT_INFO_AND_FETCH_PROFILE_SUCCESS: {
      const { data } = payload;

      const { roles, user, allocatedSubjects } = data;

      return state
        .merge(fromJS({ roles, user, allocatedSubjects }))
        .merge({ authenticated: true, inProgress: false, error: '' });
    }

    case FETCH_CURRENT_PROFILE: {
      return state.merge({ inProgress: true, error: '' });
    }

    case FETCH_CURRENT_PROFILE_FAILURE: {
      const { error } = payload;
      return state.merge({ inProgress: false, error });
    }

    case LOGOUT_USER: {
      return state.merge({
        authenticated: false,
        inProgress: false,
        error: '',
      });
    }

    case FETCH_ALL_CLASS_SUCCESS: {
      const { classes } = payload;
      const clasz = state.get('clasz').toJS();
      clasz.allClasses = classes;
      return state.merge(fromJS({ clasz }));
    }

    case FETCH_ALL_SUBJECT_SUCCESS: {
      const { subjects } = payload;
      const subject = state.get('subject').toJS();
      subject.allSubjects = subjects;
      return state.merge(fromJS({ subject }));
    }

    case FETCH_ALL_CHAPTER_SUCCESS: {
      const { data } = payload;
      const chapters = state.get('chapters').toJS();
      chapters.allChapters = data;
      return state.merge(fromJS({ chapters }));
    }

    default:
      return state;
  }
}

export default reducer;
