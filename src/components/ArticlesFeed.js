import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import Articles from "./Articles";

const ArticlesFeed = () => {
  const [listOfArticles, setListOfArticles] = useState([]);
  const [paginationIndex, setPaginationIndex] = useState(10);
  const getArticlesData = async () => {
    const getData = await fetch("https://ign-apis.herokuapp.com/articles");
    const getDataJSON = await getData.json();
    setListOfArticles(getDataJSON.data);
  };
  const pagination = async () => {
    if (paginationIndex === 295) {
      return;
    }
    const getData = await fetch(
      `https://ign-apis.herokuapp.com/articles?startIndex=${paginationIndex}&count=5`
    );
    const getDataJSON = await getData.json();
    const concatListOfArticles = listOfArticles.concat(getDataJSON.data);
    setListOfArticles(concatListOfArticles);
    setPaginationIndex((state) => state + 5);
  };
  useEffect(() => {
    getArticlesData();
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
      />
    );
  };
  return (
    <View style={styles.root}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={listOfArticles}
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

export default ArticlesFeed;
