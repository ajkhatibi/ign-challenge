import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Videos from "./Videos";
import { fetchingFeed, fetchingPagniatedFeed } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../reducer/videoFeedReducer";
const VideosFeed = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.videoFeedReducer);
  useEffect(() => {
    dispatch(fetchingFeed("videos", actionTypes.FETCHING_VIDEO_FEED));
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <Videos
        description={item.metadata?.description}
        image={item.thumbnails[0]?.url}
        category={item.contentType}
        id={item.contentId}
      />
    );
  };
  return (
    <View style={styles.root}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={state.data}
        renderItem={_renderItem}
        ListFooterComponent={() => <ActivityIndicator />}
        onEndReached={() =>
          dispatch(
            fetchingPagniatedFeed("videos", actionTypes.FETCHING_PAGINATED_FEED)
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
});

export default VideosFeed;
