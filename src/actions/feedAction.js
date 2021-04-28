export const fetchingFeed = (path, type) => async (dispatch) => {
  const getData = await fetch(`https://ign-apis.herokuapp.com/${path}`);
  const getDataJSON = await getData.json();
  dispatch({
    type,
    payload: getDataJSON.data,
  });
};

export const fetchingPagniatedFeed = (path, type) => async (
  dispatch,
  getState
) => {
  const { index } =
    path === "articles"
      ? getState().articlesFeedReducer
      : getState().videoFeedReducer;
  if (index === 295) {
    return;
  }
  const getData = await fetch(
    `https://ign-apis.herokuapp.com/${path}?startIndex=${index}&count=5`
  );
  const getDataJSON = await getData.json();
  dispatch({
    type,
    payload: getDataJSON.data,
  });
};
