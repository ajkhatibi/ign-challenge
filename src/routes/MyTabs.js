import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import ArticlesFeed from "../screens/ArticlesFeed";
import VideosFeed from "../screens/VideosFeed";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.buttonView}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: isFocused ? "#b02b21" : "grey",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const MyTabs = () => (
  <Tab.Navigator tabBar={MyTabBar}>
    <Tab.Screen name="Articles" component={ArticlesFeed} />
    <Tab.Screen name="Videos" component={VideosFeed} />
  </Tab.Navigator>
);

export default MyTabs;

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "white",
    borderTopColor: "#D3D3D3",
    borderTopWidth: 1,
  },
});
