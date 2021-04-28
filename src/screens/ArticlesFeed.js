import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Modal,
  Button,
} from "react-native";
import Articles from "../components/Articles";
import { WebView } from "react-native-webview";
import { fetchingFeed, fetchingPagniatedFeed } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../reducer/articlesFeedReducer";

const ArticlesFeed = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.articlesFeedReducer);
  useEffect(() => {
    dispatch(fetchingFeed("articles", actionTypes.GET_FEED));
  }, []);
  const _renderItem = ({ item }) => {
    return (
      <Articles
        author={item.authors[0]?.name}
        authorImage={item.authors[0]?.thumbnail}
        description={item.metadata?.description}
        title={item.metadata.headline}
        image={item.thumbnails[0]?.url}
        category={item.contentType}
        id={item.contentId}
        onPress={() => setModalVisible(true)}
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
          dispatch(fetchingPagniatedFeed("articles", actionTypes.PAGINATE_FEED))
        }
      />
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Button title={"Close"} onPress={() => setModalVisible(false)} />
        <WebView source={{ uri: "https://www.ign.com" }} />
      </Modal>
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

export default ArticlesFeed;
