import { fromJS } from 'immutable';
import { QuestionStatusType } from 'containers/McqStatusManager/StatusType';
import { FETCH_ALL_MCQ_SUCCESS, FETCH_MCQ_SUCCESS } from './constants';

const initialState = fromJS({
  mcq: {},
  pendingMcqs: [],
  rejectedMcqs: [],
  approvedMcqs: [],
  inProgress: false,
  error: '',
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

    case FETCH_MCQ_SUCCESS: {
      const { mcq } = payload;
      return state.merge(fromJS({ mcq }));
    }
    default:
      return state;
  }
}

export default reducer;
