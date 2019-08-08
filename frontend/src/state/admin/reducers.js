import { fromJS } from 'immutable';

import {
  FETCH_ALL_ROLES_SUCCESS,
  FETCH_ALL_INSTITUTE_SUCCESS,
  FETCH_INSTITUTE_SUCCESS,
  FETCH_ALL_EIIN_SUCCESS,
  FETCH_NEW_PASSWORD_SUCCESS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_CLASS_SUCCESS,
  FETCH_ALL_CLASS_SUCCESS,
  FETCH_ALL_SUBJECT_SUCCESS,
  FETCH_SUBJECT_SUCCESS,
  FETCH_ALL_CHAPTER_SUCCESS,
  FETCH_CHAPTER_SUCCESS,
} from './constants';

const initialState = fromJS({
  allRoles: [],
  allEiinNumber: [],
  user: {
    allUsers: [],
    details: {},
    generatedPassword: '',
  },
  institute: {
    allInstitutes: [],
    details: {},
  },
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

    case FETCH_ALL_EIIN_SUCCESS: {
      const { data } = payload;
      return state.merge(fromJS({ allEiinNumber: data }));
    }

    case FETCH_NEW_PASSWORD_SUCCESS: {
      const { password } = payload;
      const user = state.get('user').toJS();
      user.generatedPassword = password;
      return state.merge(fromJS({ user }));
    }

    case FETCH_ALL_USERS_SUCCESS: {
      const { data } = payload;
      const user = state.get('user').toJS();
      user.allUsers = data;
      return state.merge(fromJS({ user }));
    }

    case FETCH_USER_SUCCESS: {
      const { data } = payload;
      const user = state.get('user').toJS();
      user.details = data;
      return state.merge(fromJS({ user }));
    }

    case FETCH_CLASS_SUCCESS: {
      const { detail } = payload;
      const clasz = state.get('clasz').toJS();
      clasz.details = detail;
      return state.merge(fromJS({ clasz }));
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

    case FETCH_SUBJECT_SUCCESS: {
      const { detail } = payload;
      const subject = state.get('subject').toJS();
      subject.details = detail;
      return state.merge(fromJS({ subject }));
    }

    case FETCH_ALL_CHAPTER_SUCCESS: {
      const { data } = payload;
      const chapters = state.get('chapters').toJS();
      chapters.allChapters = data;
      return state.merge(fromJS({ chapters }));
    }

    case FETCH_CHAPTER_SUCCESS: {
      const { data } = payload;
      const chapters = state.get('chapters').toJS();
      chapters.details = data;
      return state.merge(fromJS({ chapters }));
    }

    default:
      return state;
  }
}

export default reducer;
