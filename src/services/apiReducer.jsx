/**
 * API Reducer
 * Centralized state management for API calls
 */

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const initialState = {
  apiStatus: apiStatusConstants.initial,
};

const apiReducer = (state = initialState, action) => {
  switch (action.apiStatus) {
    case apiStatusConstants.success:
      return {
        apiStatus: apiStatusConstants.success,
        data: action.payload,
      };
    case apiStatusConstants.failure:
      return {
        ...state,
        apiStatus: apiStatusConstants.failure,
        data: action.payload,
      };
    case apiStatusConstants.inProgress:
      return {
        ...state,
        apiStatus: apiStatusConstants.inProgress,
      };
    case apiStatusConstants.initial:
      return {
        apiStatus: apiStatusConstants.initial,
      };
    // direct update within modal(api-response)
    default:
      return {
        ...state,
        data: {
          ...state.data,
          data: { ...state.data.data, ...action },
        },
      };
  }
};

export { apiReducer, initialState };
