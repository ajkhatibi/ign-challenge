const INITIAL_STATE = {
  data: [],
  index: 10,
};

export const actionTypes = {
  GET_FEED: "GET_FEED",
  PAGINATE_FEED: "PAGINATE_FEED",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_FEED:
      return { ...state, data: action.payload };
    case actionTypes.PAGINATE_FEED:
      console.log("");
      return {
        data: state.data.concat(action.payload),
        index: state.index + 5,
      };
    default:
      return state;
  }
};
