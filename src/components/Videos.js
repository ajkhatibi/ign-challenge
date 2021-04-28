import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

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
    <View style={styles.container}>
      <View>
        <Image
          resizeMethod="resize"
          source={{ uri: props.image }}
          style={styles.image}
        />
        <Text style={styles.description}>{props.description}</Text>
      </View>
      <View style={styles.tailEndContent}>
        <Text style={styles.categoryText}>{props.category}</Text>
        <Text>{count}</Text>
      </View>
    </View>
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
  description: {
    fontWeight: "400",
    fontSize: 14,
    margin: 5,
  },
  tailEndContent: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
  },
  categoryText: {
    color: "red",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
