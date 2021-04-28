import { combineReducers } from "redux";
import articlesFeedReducer from "./articlesFeedReducer";
import videoFeedReducer from "./videoFeedReducer";

export default combineReducers({
  articlesFeedReducer,
  videoFeedReducer,
});
