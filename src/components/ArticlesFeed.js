import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Articles from "./Articles";

const ArticlesFeed = () => {
  const [listOfArticles, setListOfArticles] = useState([]);
  const getArticlesData = async () => {
    const getData = await fetch("https://ign-apis.herokuapp.com/articles");
    const getDataJSON = await getData.json();
    console.log(getDataJSON.data);
    setListOfArticles(getDataJSON.data);
  };
  useEffect(() => {
    getArticlesData();
  }, []);
  const _renderItem = ({ item }) => {
    return (
      <Articles
        author={item.authors[0].name}
        authorImage={item.authors[0].thumbnail}
        description={item.metadata.description}
        title={item.metadata.headline}
        image={item.thumbnails[0].url}
        category={item.contentType}
        id={item.contentId}
      />
    );
  };
  return (
    <View style={styles.root}>
      <FlatList data={listOfArticles} renderItem={_renderItem} />
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
