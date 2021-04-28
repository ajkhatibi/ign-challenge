import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import useGetComment from "../api/useGetComment";

export default function Videos(props) {
  const [count] = useGetComment(props.id);
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.imageView}>
        <Image
          resizeMethod="resize"
          source={props.image ? { uri: props.image } : null}
          style={styles.image}
        />
        <Text style={styles.description}>
          {props.description.length < 100
            ? `${props.description}`
            : `${props.description.substring(0, 100)}...`}
        </Text>
        <View style={styles.playButton}>
          <Feather name="play" size={25} color="white" />
        </View>
      </View>
      <View style={styles.tailEndContent}>
        <View>
          <Text style={styles.categoryText}>{props.category}</Text>
          <View style={styles.underline} />
        </View>
        <View style={styles.commentView}>
          <EvilIcons name="comment" size={24} color="black" />
          <Text>{count}</Text>
        </View>
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
  description: {
    fontWeight: "400",
    fontSize: 14,
    marginHorizontal: 5,
    marginVertical: 15,
  },
  tailEndContent: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 10,
  },
  categoryText: {
    color: "#b02b21",
    fontWeight: "bold",
  },
  commentView: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#b02b21",
    justifyContent: "center",
    alignItems: "center",
    bottom: 70,
    left: 10,
    paddingLeft: 5,
  },
  imageView: {
    height: Dimensions.get("screen").height * 0.4,
  },
  underline: {
    flex: 1,
    alignItems: "center",
    marginTop: 3,
    backgroundColor: "#b02b21",
    height: 2,
  },
});
