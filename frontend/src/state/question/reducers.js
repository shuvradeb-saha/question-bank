import { fromJS } from 'immutable';

const initialState = fromJS({
  inProgress: false,
  error: '',
});

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    default:
      return state;
  }
}

export default reducer;
