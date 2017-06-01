import { combineReducers } from 'redux'

const results = (state = [], action) => {
  switch(action.type) {
    case 'RECEIVE_RESULTS':
      return Object.assign({}, {
        time: action.time,
        resultList: action.resultList,
        numberOfDuplicates: action.numberOfDuplicates,
        originalLength: action.originalLength
      });
    case 'CLEAR_RESULTS':
      return {};
    default:
      return state;
  }
}

const error = (state = [], action) => {
  switch(action.type) {
    case 'CLEAR_ERROR':
      return {};
    case 'ERROR':
      return Object.assign({}, {
        message: action.message
      });
    default:
      return state;
  }
}

export default combineReducers({
  results,
  error
});
