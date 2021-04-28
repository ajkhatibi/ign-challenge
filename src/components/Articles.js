import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default function Articles(props) {
  const [count, setCount] = useState(0);
  const getCommentCount = async () => {
    const getFetchData = await fetch(
      `https://ign-apis.herokuapp.com/comments?ids=${props.id}`
    );
    const getFetchDataJSON = await getFetchData.json();
    setCount(getFetchDataJSON.content[0].count);
  };
  useEffect(() => {
    getCommentCount();
  }, []);
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Image
          resizeMethod="resize"
          source={{ uri: props.image }}
          style={styles.image}
        />
        <Text style={styles.description}>{props.description}</Text>
      </View>
      <View style={styles.authorView}>
        <Image source={{ uri: props.authorImage }} style={styles.authorImage} />
        <Text style={styles.byText}>
          By{" "}
          <Text style={StyleSheet.compose(styles.byText, styles.byTextAlt)}>
            {props.author}
          </Text>
        </Text>
      </View>
      <View style={styles.tailEndContent}>
        <Text style={styles.categoryText}>{props.category}</Text>
        <Text>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: Dimensions.get("screen").width - 20,
    margin: 5,
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    height: 180,
    width: Dimensions.get("screen").width - 40,
    borderRadius: 10,
  },
  authorImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  byText: {
    fontWeight: "500",
  },
  byTextAlt: {
    textDecorationLine: "underline",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 5,
    textAlign: "left",
  },
  description: {
    fontWeight: "400",
    fontSize: 14,
    margin: 5,
  },
  authorView: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  tailEndContent: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
  },
  categoryText: {
    color: "#b02b21",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
