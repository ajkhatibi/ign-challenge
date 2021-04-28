import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Videos from "./Videos";

const VideosFeed = () => {
  const [listOfVideos, setListOfVideos] = useState([]);
  const [paginationIndex, setPaginationIndex] = useState(10);
  const getVideosData = async () => {
    const getData = await fetch("https://ign-apis.herokuapp.com/videos");
    const getDataJSON = await getData.json();
    setListOfVideos(getDataJSON.data);
  };
  const pagination = async () => {
    if (paginationIndex === 295) {
      return;
    }
    const getData = await fetch(
      `https://ign-apis.herokuapp.com/videos?startIndex=${paginationIndex}&count=5`
    );
    const getDataJSON = await getData.json();
    const concatListOfVideos = listOfVideos.concat(getDataJSON.data);
    setListOfVideos(concatListOfVideos);
    setPaginationIndex((state) => state + 5);
  };
  useEffect(() => {
    getVideosData();
  }, []);

  const _renderItem = ({ item }) => {
    console.log("item: ", item);
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
        data={listOfVideos}
        renderItem={_renderItem}
        ListFooterComponent={() => <ActivityIndicator />}
        onEndReached={pagination}
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
