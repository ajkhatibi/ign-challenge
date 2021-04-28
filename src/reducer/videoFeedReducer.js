export const actionTypes = {
  FETCHING_VIDEO_FEED: "FETCHING_VIDEO_FEED",
  FETCHING_PAGINATED_FEED: "FETCHING_PAGINATED_FEED",
};

const INITIAL_STATE = {
  data: [],
  index: 10,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCHING_VIDEO_FEED:
      return { ...state, data: action.payload };
    case actionTypes.FETCHING_PAGINATED_FEED:
      return {
        data: state.data.concat(action.payload),
        index: state.index + 5,
      };
    default:
      return state;
  }
};
