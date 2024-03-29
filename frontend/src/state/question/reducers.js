import { fromJS } from 'immutable';
import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';
import {
  FETCH_ALL_MCQ_SUCCESS,
  FETCH_MCQ,
  FETCH_MCQ_SUCCESS,
  FETCH_MCQ_FAILURE,
  FETCH_ALL_MCQ_FOR_MODERATOR_SUCCESS,
  FETCH_MCQ_FOR_MODERATION,
  FETCH_MCQ_FOR_MODERATION_FAILURE,
  FETCH_MCQ_FOR_MODERATION_SUCCESS,
  FETCH_ALL_CQ_SUCCESS,
  FETCH_CQ_FIALURE,
  FETCH_CQ_SUCCESS,
  FETCH_CQ,
  FETCH_ALL_CQ_FOR_MODERATOR_SUCCESS,
  FETCH_CQ_FOR_MODERATION_SUCCESS,
  FETCH_CQ_FOR_MODERATION_FAILURE,
  FETCH_CQ_FOR_MODERATION,
} from './constants';

const initialState = fromJS({
  mcq: {},
  cq: {},
  pendingMcqs: [],
  rejectedMcqs: [],
  approvedMcqs: [],
  pendingCqs: [],
  rejectedCqs: [],
  approvedCqs: [],
  moderator: {
    pendingMcqs: [],
    rejectedMcqs: [],
    approvedMcqs: [],
    mcq: {
      question: {},
      similar: [],
    },
    pendingCqs: [],
    rejectedCqs: [],
    approvedCqs: [],
    cq: {
      question: {},
      similar: [],
    },
  },
  inProgress: false,
  errorCode: '',
});

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_ALL_MCQ_SUCCESS: {
      const { status, mcqs } = payload;

      if (QuestionStatusType.PENDING === status) {
        return state.merge(fromJS({ pendingMcqs: mcqs }));
      } else if (QuestionStatusType.APPROVED === status) {
        return state.merge(fromJS({ approvedMcqs: mcqs }));
      } else {
        return state.merge(fromJS({ rejectedMcqs: mcqs }));
      }
    }
    case FETCH_CQ:
    case FETCH_MCQ_FOR_MODERATION:
    case FETCH_CQ_FOR_MODERATION:
    case FETCH_MCQ: {
      return state.merge(fromJS({ inProgress: true }));
    }

    case FETCH_MCQ_SUCCESS: {
      const { mcq } = payload;
      return state.merge(fromJS({ mcq, inProgress: false, errorCode: '' }));
    }

    case FETCH_CQ_FIALURE:
    case FETCH_MCQ_FOR_MODERATION_FAILURE:
    case FETCH_CQ_FOR_MODERATION_FAILURE:
    case FETCH_MCQ_FAILURE: {
      const { errorCode } = payload;
      return state.merge(fromJS({ errorCode, inProgress: false }));
    }

    case FETCH_ALL_MCQ_FOR_MODERATOR_SUCCESS: {
      const { status, mcqs } = payload;
      const moderator = state.get('moderator').toJS();

      if (QuestionStatusType.PENDING === status) {
        moderator.pendingMcqs = mcqs;
        return state.merge(fromJS({ moderator }));
      } else if (QuestionStatusType.APPROVED === status) {
        moderator.approvedMcqs = mcqs;
        return state.merge(fromJS({ moderator }));
      } else {
        moderator.rejectedMcqs = mcqs;
        return state.merge(fromJS({ moderator }));
      }
    }

    case FETCH_ALL_CQ_FOR_MODERATOR_SUCCESS: {
      const { status, cqs } = payload;
      const moderator = state.get('moderator').toJS();

      if (QuestionStatusType.PENDING === status) {
        moderator.pendingCqs = cqs;
        return state.merge(fromJS({ moderator }));
      } else if (QuestionStatusType.APPROVED === status) {
        moderator.approvedCqs = cqs;
        return state.merge(fromJS({ moderator }));
      } else {
        moderator.rejectedCqs = cqs;
        return state.merge(fromJS({ moderator }));
      }
    }

    case FETCH_MCQ_FOR_MODERATION_SUCCESS: {
      const { mcqDetails } = payload;

      const moderator = state.get('moderator').toJS();
      const mcq = moderator.mcq;
      mcq.question = mcqDetails.newMcq;
      mcq.similar = mcqDetails.similarMcqs;

      return state.merge(
        fromJS({ moderator, inProgress: false, errorCode: '' })
      );
    }

    case FETCH_CQ_FOR_MODERATION_SUCCESS: {
      const { cqDetails } = payload;

      const moderator = state.get('moderator').toJS();
      const cq = moderator.cq;
      cq.question = cqDetails.newCq;
      cq.similar = cqDetails.similarCqs;

      return state.merge(
        fromJS({ moderator, inProgress: false, errorCode: '' })
      );
    }

    case FETCH_ALL_CQ_SUCCESS: {
      const { status, cqs } = payload;

      if (QuestionStatusType.PENDING === status) {
        return state.merge(fromJS({ pendingCqs: cqs }));
      } else if (QuestionStatusType.APPROVED === status) {
        return state.merge(fromJS({ approvedCqs: cqs }));
      } else {
        return state.merge(fromJS({ rejectedCqs: cqs }));
      }
    }

    case FETCH_CQ_SUCCESS: {
      const { cq } = payload;
      return state.merge(fromJS({ cq, inProgress: false, errorCode: '' }));
    }

    default:
      return state;
  }
}

export default reducer;
